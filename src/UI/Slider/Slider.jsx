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
   * @param dots {string | bool} ("inside" === true | "outside" | false)
   * @param margin {string} - margin between frames
   * @param slidesDelay {msc}
   */

  constructor (props) {
    super(props)

    this.state = {
      curFrame: 0,
      frames: props.items.map(item => ({ item, offset: null })),
      transition: props.firstTransition,
      offset: 0
    }
    while (this.state.frames.length < this.getItemsOnPage()) {
      this.state.frames.push({ item: <div key={'emptyFrame' + this.state.frames.length}/>, offset: null })
    }

    this.setFrame(this.state.curFrame)
  }

  dragHandler = (downEvent) => {
    if (this.slidesInterval) {
      clearInterval(this.slidesInterval)
    }

    downEvent.persist()
    let moveEventType = 'mousemove'
    let upEventType = 'mouseup'

    if (downEvent.type === 'touchstart') {
      moveEventType = 'touchmove'
      upEventType = 'touchend'
    } else {
      // downEvent.preventDefault()
    }

    document.body.classList.add(cls.grabbing)
    let prevX = downEvent.clientX != null ? downEvent.clientX : downEvent.touches[0].clientX
    let prevOffset = this.state.offset
    let nextFrame = false
    let prevFrame = false

    const pxToPercent = 100 / this.sliderElem.getBoundingClientRect().width

    const movement = async (moveEvent) => {
      moveEvent.preventDefault()

      let offsetPx = (moveEvent.clientX != null ? moveEvent.clientX : moveEvent.touches[0].clientX) - prevX

      if (!prevFrame && !nextFrame) {
        this.setState({
          transition: false,
          offset: prevOffset + offsetPx * pxToPercent
        })

        if (offsetPx < 0) {
          if ( // If curFrame is on last page and need to transfer first frame
            this.state.curFrame + this.getItemsOnPage() >= this.state.frames.length &&
            this.state.frames[this.getItemsOnPage() - this.state.frames.length + this.state.curFrame].offset !==
            this._calculateTransferOffset()
          ) {
            this._transferFrames(this.state.frames.slice(
              this.getItemsOnPage() - this.state.frames.length + this.state.curFrame,
              this.getItemsOnPage() - this.state.frames.length + this.state.curFrame + 1
            ), true)
            this.setState({})
          } else if ( // If curFrame is not last and need to reset next frame
            this.state.curFrame + this.getItemsOnPage() < this.state.frames.length &&
            this.state.frames[this.state.curFrame + this.getItemsOnPage()].offset !== null
          ) {
            this._resetFrames(this.state.frames.slice(
              this.state.curFrame + this.getItemsOnPage(),
              this.state.curFrame + 1 + this.getItemsOnPage())
            )
            this.setState({})
          }
        } else if (offsetPx > 0) {
          if ( // If curFrame is first and need to transfer last frame
            this.state.curFrame === 0 &&
            this.state.frames[this.state.frames.length - 1].offset !== this._calculateTransferOffset()
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
      }

      if (-offsetPx * pxToPercent > this.getFrameWidth() && !nextFrame) {
        nextFrame = true

        await this.nextFrame()

        prevX = moveEvent.clientX != null ? moveEvent.clientX : moveEvent.touches[0].clientX
        prevOffset = this.state.offset
        nextFrame = false
      } else if (offsetPx * pxToPercent > this.getFrameWidth() && !prevFrame) {
        prevFrame = true

        await this.prevFrame()

        prevX = moveEvent.clientX != null ? moveEvent.clientX : moveEvent.touches[0].clientX
        prevOffset = this.state.offset
        prevFrame = false
      }
    }

    document.addEventListener(moveEventType, movement)

    const mouseup = (upEvent) => {
      document.removeEventListener(moveEventType, movement)
      document.removeEventListener(upEventType, mouseup)
      document.body.classList.remove(cls.grabbing)

      if (this.props.slidesDelay) {
        this.slidesInterval = setInterval(this.nextFrame, this.props.slidesDelay)
      }

      if (!prevFrame && !nextFrame) {
        this.setState({
          transition: true
        })
        if ((upEvent.clientX != null ? upEvent.clientX : upEvent.changedTouches[0].clientX) - prevX > 50) {
          this.prevFrame()
        } else if ((upEvent.clientX != null ? upEvent.clientX : upEvent.changedTouches[0].clientX) - prevX < -50) {
          this.nextFrame()
        } else {
          this.setState({
            offset: prevOffset
          })
        }
      }
    }

    document.addEventListener(upEventType, mouseup)
  }

  async componentDidMount () {
    this.props.startSlide && this.setFrame(this.props.startSlide)
    await this.requestAnimationFrameAsync()
    this.setState({ transition: true })

    if (this.props.slidesDelay) {
      this.slidesInterval = setInterval(this.nextFrame, this.props.slidesDelay)
    }
  }

  async componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.itemsOnPage !== this.props.itemsOnPage) {
      this.setState({ transition: false })
      this.setFrame(this.state.curFrame, null, true)
      await this.requestAnimationFrameAsync()
      this.setState({ transition: true })
    }
  }

  componentWillUnmount () {
    if (this.slidesInterval) {
      clearInterval(this.slidesInterval)
    }
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

  _calculateTransferOffset (right = false) {
    return `calc((100%${this.props.margin ? ` + ${this.props.margin}` : ''}) * ${right ? '' : '-'}${this.state.frames.length})`
  }

  _transferFrames (frames, right = false) {
    frames.forEach(frame => {
      frame.offset = this._calculateTransferOffset(right) // this.state.frames.length * 100 * (right ? 1 : -1)
    })
  }

  setFrame = async (frameIndex, direction, important) => {
    if ((frameIndex === this.state.curFrame && !important) || frameIndex >= this.state.frames.length) {
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
      if (frameIndex >= this.state.curFrame) {
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
      if (frameIndex <= this.state.curFrame) {
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

        await this.setState({
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
          this.props.useRef && this.props.useRef(ref)
        }}
        onMouseDown={this.dragHandler}
        onTouchStart={this.dragHandler}
      >
        <div
          style={{
            transition: this.state.transition ? `all .4s ease` : null,
            transform: `translate(${this.state.offset}%)`
          }}
          className={cls.slideWrap}
        >
          {
            this.state.frames.map(item => Frame(item.item, item.offset, this.getFrameWidth(), this.props.margin))
          }
        </div>
        <div className={cls.Navigation}>
          <div onClick={this.prevFrame}><Icon icon='arrow_back'/></div>
          <div onClick={this.nextFrame}><Icon icon='arrow_forward'/></div>
        </div>
        {
          this.props.dots === true || ['inside', 'outside'].includes(this.props.dots)
            ? <div className={mergeClasses(cls.dots, this.props.dots === 'outside' && cls.outsideDots)}>
              {this.createDots()}
            </div>
            : null
        }
      </div>
    )
  }
}

const Frame = (item, offset, width, margin, metric = '%') => {
  return React.cloneElement(item, {
    style: {
      transform: offset ? `translate3d(${offset}, 0, 0)` : null,
      width: margin ? `calc(${width}${metric} - ${margin})` : `${width}${metric}`,
      marginLeft: margin ? `calc(${margin} / 2)` : null,
      marginRight: margin ? `calc(${margin} / 2)` : null
    }
  })
}
