import React from 'react'
import Icon from '../Icon/Icon'
import cls from './Slider.scss'
import mergeClasses from '../../utils/mergeClasses'

export default class Slider extends React.Component {
  /*
   * @param itemsOnPage {Number}
   * @param items {List}
   * @param className {string}
   * @param startSlide {Number | null}
   * @param withDots {bool}
   */

  constructor (props) {
    super(props)

    this.state = {
      curFrame: 0,
      frames: props.items.map(item => ({ item, offset: '0' })),
      transition: props.firstTransition,
      offset: 0
    }
    while (this.state.frames.length < this.getItemsOnPage()) {
      this.state.frames.push({ item: <div key={'emptyFrame' + this.state.frames.length}/>, offset: 0 })
    }

    this.setFrame(this.state.curFrame)

    window.setFrame = this.setFrame
  }

  dragHandler = (downEvent) => {
    downEvent.persist()
    downEvent.preventDefault()
    document.body.classList.add(cls.grabbing)
    let prevX = downEvent.clientX
    let prevOffset = this.state.offset
    let nextFrame = false
    let prevFrame = false

    const pxToPercent = 100 / this.sliderElem.getBoundingClientRect().width

    const movement = async (moveEvent) => {
      let offsetPx = moveEvent.clientX - prevX

      this.setState({
        transition: false,
        offset: prevOffset + offsetPx * pxToPercent
      })

      if (offsetPx < 0 && !nextFrame) {
        if ( // If curFrame is l  ast and need to transfer first frame
          this.state.curFrame === this.state.frames.length - 1 &&
          this.state.frames[0].offset !== this.state.frames.length * 100
        ) {
          this._transferFrames(this.state.frames.slice(0, 1), true)
          this.setState({})
        } else if ( // If curFrame is not last and need to reset next frame
          this.state.curFrame !== this.state.frames.length - 1 &&
          this.state.frames[this.state.curFrame + 1].offset !== null
        ) {
          this._resetFrames(this.state.frames.slice(this.state.curFrame + 1, this.state.curFrame + 2))
          this.setState({})
        }
      } else if (offsetPx > 0 && !prevFrame) {
        if ( // If curFrame is first and need to transfer last frame
          this.state.curFrame === 0 &&
          this.state.frames[this.state.frames.length - 1].offset !== -this.state.frames.length * 100
        ) {
          this._transferFrames(this.state.frames.slice(this.state.frames.length - 1))
          this.setState({})
        } else if ( // If curFrame is not first and need to reset prev frame
          this.state.curFrame !== 0 &&
          this.state.frames[this.state.curFrame - 1].offset !== null
        ) {
          this._resetFrames(this.state.frames.slice(this.state.curFrame - 1, this.state.curFrame))
          this.setState({})
        }
      }

      if (-offsetPx * pxToPercent > this.getFrameWidth() && !nextFrame) {
        nextFrame = true

        await this.nextFrame()

        prevX = moveEvent.clientX
        prevOffset = this.state.offset
        nextFrame = false
      } else if (offsetPx * pxToPercent > this.getFrameWidth() && !prevFrame) {
        prevFrame = true

        await this.prevFrame()

        prevX = moveEvent.clientX
        prevOffset = this.state.offset
        prevFrame = false
      }
    }

    document.addEventListener('mousemove', movement)

    const mouseup = (upEvent) => {
      document.removeEventListener('mousemove', movement)
      document.removeEventListener('mouseup', mouseup)
      document.body.classList.remove(cls.grabbing)

      this.setState({
        transition: true
      })

      if (upEvent.clientX - prevX > 50) {
        this.prevFrame()
      } else if (upEvent.clientX - prevX < -50) {
        this.nextFrame()
      } else {
        this.setState({
          offset: prevOffset
        })
      }
    }

    document.addEventListener('mouseup', mouseup)
  }

  async componentDidMount () {
    this.props.startSlide && this.setFrame(this.props.startSlide)
    await this.requestAnimationFrameAsync()
    this.setState({ transition: true })
  }

  sliderElem = null

  getItemsOnPage = () => {
    return this.props.itemsOnPage || 1
  }

  getSlidesNumber = () => {
    return Math.ceil(this.props.items.length / this.getItemsOnPage())
  }

  getSlideNumber = (frameNumber) => {
    return parseInt(frameNumber / this.getItemsOnPage())
  }

  getFrameWidth = () => {
    return 100 / this.getItemsOnPage()
  }

  setSlide = (index) => {
    this.setFrame(index * this.getItemsOnPage())
  }

  requestAnimationFrameAsync = () => {
    return new Promise((resolve, reject) => {
      requestAnimationFrame(resolve)
    })
  }

  _resetFrames (frames) {
    frames.forEach(frame => {
      frame.offset = null
    })
  }

  _transferFrames (frames, right = false) {
    frames.forEach(frame => {
      frame.offset = this.state.frames.length * 100 * (right ? 1 : -1)
    })
  }

  setFrame = async (frameIndex, direction) => {
    if (frameIndex === this.state.curFrame || frameIndex >= this.state.frames.length) {
      return
    }

    if (!direction || !['left', 'right'].includes(direction)) {
      if (this.state.curFrame > frameIndex) {
        const distToLeft = this.state.curFrame - frameIndex
        const distToRight = frameIndex + this.state.frames.length - this.state.curFrame
        direction = distToLeft <= distToRight ? 'left' : 'right'
      } else {
        const distToLeft = this.state.curFrame + this.state.frames.length - frameIndex
        const distToRight = frameIndex - this.state.curFrame
        direction = distToLeft < distToRight ? 'left' : 'right'
      }
    }

    if (direction === 'right') {
      if (frameIndex > this.state.curFrame) {
        this._resetFrames(this.state.frames.slice(this.state.curFrame, frameIndex + this.getItemsOnPage()))
        this._transferFrames(this.state.frames.slice(0, Math.max(0, this.getItemsOnPage() - (this.state.frames.length - frameIndex))), true)
      } else {
        this._transferFrames(this.state.frames.slice(this.state.curFrame, this.state.frames.length))
        this._resetFrames(this.state.frames.slice(0, frameIndex + this.getItemsOnPage()))
        this._transferFrames(this.state.frames.slice(0, Math.max(0, this.getItemsOnPage() - (this.state.frames.length - frameIndex))), true)

        const additionalOffset = this.state.offset + this.state.curFrame * this.getFrameWidth()

        await this.requestAnimationFrameAsync()
        await this.setState({
          transition: false,
          offset: (this.state.frames.length - this.state.curFrame) * this.getFrameWidth() + additionalOffset
        })

        await this.requestAnimationFrameAsync()
        this.setState({
          transition: true
        })
      }
    } else { // left
      if (frameIndex < this.state.curFrame) {
        this._resetFrames(this.state.frames.slice(frameIndex, this.state.curFrame + this.getItemsOnPage()))
        this._transferFrames(
          this.state.frames.slice(0, Math.max(0, frameIndex - this.state.frames.length + this.getItemsOnPage())),
          true
        )
      } else {
        this._transferFrames(this.state.frames.slice(0, this.state.curFrame + this.getItemsOnPage()), true)
        this._resetFrames(this.state.frames.slice(frameIndex, this.state.frames.length))

        const additionalOffset = this.state.offset - this.state.curFrame * this.getFrameWidth()

        await this.requestAnimationFrameAsync()
        await this.setState({
          transition: false,
          offset: -(this.state.frames.length + this.state.curFrame) * this.getFrameWidth() + additionalOffset
        })

        await this.requestAnimationFrameAsync()

        this.setState({
          transition: true
        })
      }
    }

    await this.setState({
      offset: -frameIndex * this.getFrameWidth(),
      curFrame: frameIndex
    })
  }

  nextFrame = async () => {
    await this.setFrame((this.state.curFrame + 1) % this.state.frames.length, 'right')
  }

  prevFrame = async () => {
    await this.setFrame((this.state.frames.length + this.state.curFrame - 1) % this.state.frames.length, 'left')
  }

  createDots = () => {
    const dots = []
    const slidesNumber = this.getSlidesNumber()
    const curSlide = this.getSlideNumber(this.state.curFrame)
    for (let i = 0; i < slidesNumber; i++) {
      dots.push(
        <span
          className={mergeClasses(curSlide === i && cls.active)}
          key={i}
          onClick={() => this.setSlide(i)}
        />
      )
    }
    return dots
  }

  render () {
    return (
      <div
        className={cls.Slider}
        ref={(ref) => {
          this.sliderElem = ref
        }}
      >
        <div
          style={{
            transition: this.state.transition ? `all .4s ease` : null,
            transform: `translate(${this.state.offset}%)`
          }}
          className={cls.slideWrap}
          onMouseDown={this.dragHandler}
        >
          {
            this.state.frames.map(item => Frame(item.item, item.offset, this.getFrameWidth()))
          }
        </div>
        <div className={cls.Navigation}>
          <div onClick={this.prevFrame}><Icon icon='arrow_back'/></div>
          <div onClick={this.nextFrame}><Icon icon='arrow_forward'/></div>
        </div>
        {
          this.props.withDots
            ? <div className={cls.dots}>
              {this.createDots()}
            </div>
            : null
        }
      </div>
    )
  }
}

const Frame = (item, offset, width, metric = '%') => React.cloneElement(item, {
  style: {
    transform: offset ? `translateX(${offset}${metric}` : null,
    width: `${width}${metric}`
  }
})
