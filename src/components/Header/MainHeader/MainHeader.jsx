import React from 'react'
import cls from './MainHeader.scss'
import mergeClasses from '../../../utils/mergeClasses'
import Navigation from './Navigation/Navigation'
import Social from './Social/Social'
import { stickElement } from '../../../utils/sticky'
import { timeoutThrottle } from '../../../utils/throttle'

export default class MainHeader extends React.Component {
  state = {
    isMenuOpen: false
  }

  toggleMenu = (e) => {
    e.nativeEvent.stopImmediatePropagation()

    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen
    }))
  }

  closeMenu = (e) => {
    if (e && this.nav && !e.nativeEvent && e.path.includes(this.nav)) {
      return
    }
    this.setState(prevState => prevState.isMenuOpen ? { isMenuOpen: false } : null)
  }

  componentDidMount () {
    document.addEventListener('click', this.closeMenu)

    const origY = this.headerElem.getBoundingClientRect().y + document.documentElement.scrollTop
    const origPadding = parseFloat(window.getComputedStyle(this.headerElem).getPropertyValue('padding-top'))

    const paddingHandler = timeoutThrottle(() => {
      const offset = this.headerElem.getBoundingClientRect().y + document.documentElement.scrollTop - origY
      const newPadding = Math.min(Math.max(0, origPadding - offset / 2), origPadding)
      if (this.headerElem.style.paddingTop === newPadding) {
        return
      }
      this.headerElem.style.paddingTop = `${newPadding}px`
      this.headerElem.style.paddingBottom = `${newPadding}px`
    }, 20)
    this.headerElem.addEventListener('sticked', () => {
      this.headerElem.style.boxShadow = '4px 0 20px -5px rgba(0, 0, 0, 0.2)'
      document.addEventListener('scroll', paddingHandler)
    })
    this.headerElem.addEventListener('unsticked', () => {
      this.headerElem.style.boxShadow = null
      document.removeEventListener('scroll', paddingHandler)
    })

    this.clearStick = stickElement(
      this.headerElem,
      { top: 0 }
    )
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.closeMenu)
  }

  render () {
    return (
      <header
        className={cls.headerWrap}
        ref={(ref) => { this.headerElem = ref }}
      >
        <div className={mergeClasses('container', cls.header)}>
          <a href="/" className={cls.logo}>
            <img src={require('../../../../assets/images/logo.jpg')} alt=""/>
          </a>
          <Navigation
            isMenuOpen={this.state.isMenuOpen}
            closeMenu={this.closeMenu}
            innerRef={(ref) => { this.nav = ref }}
          />
          <Social toggleMenu={this.toggleMenu}/>
        </div>
      </header>
    )
  }
}
