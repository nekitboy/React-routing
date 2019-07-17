/* eslint-disable */

/*
 * Create onScroll listener for applying sticky property to element
 * @param {DOMElement} - reference to DOM Element to be sticky
 * @param {
 *  ("top" | "bottom" | "left" | "right"): px,
 *  emptySpace: true | false | undefined (=== false),
 *  action: {function('ParentOffset(Top|Bottom|Left|Right)', elem, isSticky)}
 * }
 * @ return function which remove onScroll listener | null (if can not make elem sticky)
 * }
 */
import { timeoutThrottle } from './throttle'

export function stickElement (elem, params) {
  const offsetParent = elem.offsetParent

  if (offsetParent) {
    let changeFunction = null
    if (params.top != null) {
      const calculateOffsetTop = () => {
        if (elem.previousElementSibling) {
          return elem.previousElementSibling.getBoundingClientRect().y -
            offsetParent.getBoundingClientRect().y +
            elem.previousElementSibling.getBoundingClientRect().height
        }
        return elem.getBoundingClientRect().y -
          offsetParent.getBoundingClientRect().y
      }

      // const createSpace = () => {
      //   if (elem.nextElementSibling) {
      //     console.log(elem.nextElementSibling)
      //   }
      // }
      // createSpace()

      changeFunction = () => {
        const parentRect = offsetParent.getBoundingClientRect()

        if (
          parentRect.y + calculateOffsetTop() <= params.top &&
          parentRect.bottom - params.top - elem.getBoundingClientRect().height > 0
        ) {
          if (elem.style.position === 'fixed' && !elem.style.bottom) {
            return
          }
          elem.style.position = 'fixed'
          elem.style.bottom = null
          elem.style.top = `${params.top}px`
          elem.dispatchEvent(new Event('sticked'))
        } else if (
          parentRect.bottom - params.top - elem.getBoundingClientRect().height <= 0
        ) {
          if (elem.style.position === 'absolute' && !elem.style.top) {
            return
          }
          elem.style.position = 'absolute'
          elem.style.top = null
          elem.style.bottom = 0
          elem.dispatchEvent(new Event('stickend'))
        } else if (!(elem.style.position === 'absolute' && !elem.style.bottom)) {
          elem.style.position = 'absolute'
          elem.style.bottom = null
          elem.style.top = `${calculateOffsetTop()}px`
          elem.dispatchEvent(new Event('unsticked'))
        }
      }
    } else if (params.bottom != null) {

      const calculateOffsetBottom = () => {
        if (elem.previousElementSibling) {
          return offsetParent.getBoundingClientRect().bottom -
            elem.previousElementSibling.getBoundingClientRect().bottom -
            elem.getBoundingClientRect().height
        }
        return offsetParent.getBoundingClientRect().height - elem.getBoundingClientRect().height
      }
      changeFunction = () => {
        const parentRect = offsetParent.getBoundingClientRect()

        if (
          parentRect.bottom - document.documentElement.clientHeight + params.bottom <= calculateOffsetBottom() &&
          document.documentElement.clientHeight - parentRect.y > elem.getBoundingClientRect().height + params.bottom
        ) {
          if (elem.style.position === 'absolute' && !elem.style.top) {
            return
          }
          elem.style.position = 'absolute'
          elem.style.top = null
          elem.style.bottom = `${calculateOffsetBottom()}px`

          elem.dispatchEvent(new Event('unsticked'))
        } else if (
          document.documentElement.clientHeight - parentRect.y <= elem.getBoundingClientRect().height + params.bottom
        ) {
          if (elem.style.position === 'absolute' && !elem.style.bottom) {
            return
          }
          elem.style.position = 'absolute'
          elem.style.bottom = null
          elem.style.top = 0
          elem.dispatchEvent(new Event('stickend'))
        } else if (elem.style.position !== 'fixed') {
          elem.style.position = 'fixed'
          elem.style.top = null
          elem.style.bottom = `${params.bottom}px`
          elem.dispatchEvent(new Event('sticked'))
        }
      }
    }

    if (changeFunction) {
      changeFunction()

      const throttledChangeFunction = timeoutThrottle(changeFunction, 10)
      document.addEventListener('scroll', throttledChangeFunction)

      return function() {
        document.removeEventListener('scroll', throttledChangeFunction)
      }
    }
  }
  return null
}
