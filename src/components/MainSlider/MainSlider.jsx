import React from 'react'
import Slider from '../../UI/Slider/Slider'
import Slide from './Slide/Slide'

import bgImg from '../../../assets/images/hero_1.jpg'

const items = [
  <Slide key='slide 1' text='0' backgroundImg={bgImg}/>,
  <Slide key='slide 2' text='1' backgroundImg={bgImg}/>,
  <Slide key='slide 3' text='2' backgroundImg={bgImg}/>,
  <Slide key='slide 4' text='3' backgroundImg={bgImg}/>,
  <Slide key='slide 5' text='4' backgroundImg={bgImg}/>,
  <Slide key='slide 6' text='5' backgroundImg={bgImg}/>,
  <Slide key='slide 7' text='6' backgroundImg={bgImg}/>,
  <Slide key='slide 8' text='7' backgroundImg={bgImg}/>
]

export default () => (
  <Slider items={items} itemsOnPage={3} withDots/>
)
