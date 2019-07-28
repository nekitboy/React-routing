import React from 'react'
import cls from './Testimonials.scss'
import SiteSection from '../../UI/SiteSection/SiteSection'
import Slider from '../../UI/Slider/AdaptiveSlider'
import TestimonialsCard from './TestimonialsCard/TestimonialsCard'

const items = [
  {
    name: 'Allison Holmes',
    info: 'Designer',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, mollitia. Possimus mollitia nobis libero ' +
      'quidem aut tempore dolore iure maiores, perferendis, provident numquam illum nisi amet necessitatibus. A, ' +
      'provident aperiam!',
    avatar: require('../../../assets/images/person_1.jpg'),
    key: 0
  }, {
    name: 'Allison Holmes',
    info: 'Designer',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, mollitia. Possimus mollitia nobis libero ' +
      'quidem aut tempore dolore iure maiores, perferendis, provident numquam illum nisi amet necessitatibus. A, ' +
      'provident aperiam!',
    avatar: require('../../../assets/images/person_2.jpg'),
    key: 1
  }, {
    name: 'Allison Holmes',
    info: 'Designer',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, mollitia. Possimus mollitia nobis libero ' +
      'quidem aut tempore dolore iure maiores, perferendis, provident numquam illum nisi amet necessitatibus. A, ' +
      'provident aperiam!',
    avatar: require('../../../assets/images/person_4.jpg'),
    key: 2
  }, {
    name: 'Allison Holmes',
    info: 'Designer',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, mollitia. Possimus mollitia nobis libero ' +
      'quidem aut tempore dolore iure maiores, perferendis, provident numquam illum nisi amet necessitatibus. A, ' +
      'provident aperiam!',
    avatar: require('../../../assets/images/person_1.jpg'),
    key: 3
  }, {
    name: 'Allison Holmes',
    info: 'Designer',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, mollitia. Possimus mollitia nobis libero ' +
      'quidem aut tempore dolore iure maiores, perferendis, provident numquam illum nisi amet necessitatibus. A, ' +
      'provident aperiam!',
    avatar: require('../../../assets/images/person_3.jpg'),
    key: 4
  }, {
    name: 'Allison Holmes',
    info: 'Designer',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, mollitia. Possimus mollitia nobis libero ' +
      'quidem aut tempore dolore iure maiores, perferendis, provident numquam illum nisi amet necessitatibus. A, ' +
      'provident aperiam!',
    avatar: require('../../../assets/images/person_4.jpg'),
    key: 5
  }
]

const Testimonials = () => (
  <SiteSection title='Testimonials'>
    <div className={cls.sliderWrapper}>
      <Slider
        dots='outside'
        slidesDelay={6000}
        items={items.map(item => <TestimonialsCard {...item}/>)}
        margin='30px'
        breakpoints={{ 0: 1, 510: 2 }}
        className={cls.slider}
      />
    </div>
  </SiteSection>
)

export default Testimonials
