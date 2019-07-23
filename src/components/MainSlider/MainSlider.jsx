import React from 'react'
import Slider from '../../UI/Slider/Slider'
import Slide from './Slide/Slide'

import bgImg from '../../../assets/images/hero_1.jpg'

const items = [
  <Slide key='slide 1' text='Academics University' backgroundImg={bgImg}/>,
  <Slide key='slide 2' text='You Can Learn Anything' backgroundImg={bgImg}/>
]

export default () => (
  <Slider items={items} withDots startSlide={1} />
)
