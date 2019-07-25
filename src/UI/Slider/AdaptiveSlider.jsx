import React, { useEffect, useRef } from 'react'
import Slider from './Slider'
import sizeChangeEventEmittable from '../../utils/changeSize'

const changeSizeHandler = (e) => {
  console.log(e)
}

/*
 * @param breakpoints {Object} ({"breakpoint": "itemsOnPage"})
 */
const AdaptiveSlider = ({ breakpoints, ...props }) => {
  const sliderElem = useRef(null)
  useEffect(() => {
    sizeChangeEventEmittable(sliderElem.current, 1000)
    sliderElem.current.addEventListener('sizechange', changeSizeHandler)
  }, [])
  return (
    <Slider
      useRef={(ref) => { sliderElem.current = ref }}
      {...props}
    />
  )
}

export default AdaptiveSlider
