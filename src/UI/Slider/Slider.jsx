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
      curFrame: (props.startSlide || 0) * this.getItemsOnPage(),
      frames: props.items.map(item => ({ item, offset: '0' })),
      transition: true,
      offset: 0
    }
    while (this.state.frames.length < this.getItemsOnPage()) {
      this.state.frames.push({ item: <div key={'emptyFrame' + this.state.frames.length}/>, offset: 0 })
    }

    window.setFrame = this.setFrame
  }

  sliderElem = null

  getItemsOnPage = () => {
    return this.props.itemsOnPage || 1
  }

  getSlidesNumber = () => {
    return Math.ceil(this.props.items.length / this.getItemsOnPage())
  }

  getSlideNumber = (frameNumber) => {
    return parseInt(frameNumber / this.props.itemsOnPage)
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
        direction = distToLeft < distToRight ? 'left' : 'right'
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

        await this.requestAnimationFrameAsync()
        await this.setState({
          transition: false,
          offset: (this.state.frames.length - this.state.curFrame) * this.getFrameWidth()
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

        await this.requestAnimationFrameAsync()
        await this.setState({
          transition: false,
          offset: -(this.state.frames.length + this.state.curFrame) * this.getFrameWidth()
        })

        await this.requestAnimationFrameAsync()

        this.setState({
          transition: true
        })
      }
    }

    this.setState({
      offset: -frameIndex * this.getFrameWidth(),
      curFrame: frameIndex
    })
  }

  nextFrame = async () => {
    this.setFrame((this.state.curFrame + 1) % this.state.frames.length)
    // let postprocess = () => {
    // }
    //
    // await this.setState((state) => {
    //   // Next frame is requires cycle transfer frames from beginning
    //   if (state.curFrame >= state.frames.length - this.getItemsOnPage() && state.curFrame !== state.frames.length - 1) {
    //     const transferFrameIndex = (state.curFrame + this.getItemsOnPage()) % state.frames.length
    //     const frames = state.frames
    //
    //     frames[transferFrameIndex].offset = frames.length * 100
    //
    //     return {
    //       curFrame: state.curFrame + 1,
    //       offset: state.offset - this.getFrameWidth(),
    //       frames: frames
    //     }
    //   } else if (state.curFrame === state.frames.length - 1) {
    //     const frames = state.frames
    //     frames[frames.length - 1].offset = (-frames.length) * 100
    //     for (let i = 0; i < this.getItemsOnPage() - 1; i++) {
    //       frames[i].offset = 0
    //     }
    //
    //     postprocess = async () => {
    //       await this.requestAnimationFrameAsync()
    //       this.setState((state) => {
    //         const frames = state.frames
    //         frames[frames.length - 1].offset = 0
    //         return {
    //           transition: true,
    //           offset: 0,
    //           frames: frames,
    //           curSlide: 0,
    //           curFrame: 0
    //         }
    //       })
    //     }
    //
    //     return {
    //       transition: false,
    //       offset: this.getFrameWidth(),
    //       frames: frames
    //     }
    //   } else {
    //     return {
    //       offset: state.offset - this.getFrameWidth(),
    //       curFrame: state.curFrame + 1
    //     }
    //   }
    // })
    // postprocess()
  }

  prevFrame = async () => {
    this.setFrame((this.state.frames.length + this.state.curFrame - 1) % this.state.frames.length)
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
