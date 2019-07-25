import React from 'react'
import Slider from '../../UI/Slider/AdaptiveSlider'
import Slide from './Slide/Slide'

import bgImg from '../../../assets/images/hero_1.jpg'
import bgImg1 from '../../../assets/images/blog_1.jpg'

const items = [
  <Slide key='slide 0' text='0' backgroundImg={bgImg}/>,
  <Slide key='slide 1' text='1' backgroundImg={bgImg}/>,
  <Slide key='slide 2' text='2' backgroundImg={bgImg1}/>,
  <Slide key='slide 3' text='3' backgroundImg={bgImg1}/>,
  <Slide key='slide 4' text='4' backgroundImg={bgImg1}/>,
  <Slide key='slide 5' text='5' backgroundImg={bgImg1}/>,
  <Slide key='slide 6' text='6' backgroundImg={bgImg1}/>,
  <Slide key='slide 7' text='7' backgroundImg={bgImg1}/>
]

export default () => (
  <Slider items={items} withDots startSlide={0} itemsOnPage={3} slidesDelay={3000} />
)
