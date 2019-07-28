import React, { useEffect, useRef, useState } from 'react'
import Slider from './Slider'
import sizeChangeEventEmittable from '../../utils/changeSize'

const changeSizeHandler = (setter, breakpoints) => (e) => {
  const newItemsOnPage = determineItemsOnPage(breakpoints, e.detail.width)
  setter(newItemsOnPage)
}

function determineItemsOnPage (breakpoints, width) {
  if (!breakpoints) {
    return 1
  }
  if (typeof width === 'number') {
    return breakpoints[Math.max(...Object.keys(breakpoints).filter(b => b <= width))]
  }
  return Math.min(...Object.values(breakpoints))
}

/*
 * @param breakpoints {Object} ({"breakpoint": "itemsOnPage"})
 */
const AdaptiveSlider = ({ breakpoints, ...props }) => {
  const sliderElem = useRef(null)
  const [itemsOnPage, setItemsOnPage] = useState(determineItemsOnPage(breakpoints))
  useEffect(() => {
    sizeChangeEventEmittable(sliderElem.current, 1000)
    setItemsOnPage(determineItemsOnPage(breakpoints, sliderElem.current.getBoundingClientRect().width))
    sliderElem.current.addEventListener(
      'sizechange',
      changeSizeHandler((value) => setItemsOnPage(value), breakpoints)
    )
  }, [])
  return (
    <Slider
      {...props}
      useRef={(ref) => { sliderElem.current = ref }}
      itemsOnPage={itemsOnPage}
    />
  )
}

export default AdaptiveSlider
