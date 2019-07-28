import React from 'react'
import cls from './PopularCourses.scss'
import SiteSection from '../../UI/SiteSection/SiteSection'
import Slider from '../../UI/Slider/AdaptiveSlider'
import PopularCoursesCard from './PopularCoursesCard/PopularCoursesCard'

const items = [
  {
    title: 'Mobile Application',
    price: 99.00,
    subtitle: 'How To Create Mobile Apps Using Ionic',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium ipsam.',
    rating: 5,
    img: require('../../../assets/images/course_1.jpg'),
    link: '#',
    key: 1
  }, {
    title: 'Web Design',
    price: 99.00,
    subtitle: 'How To Create Mobile Apps Using Ionic',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium ipsam.',
    rating: 5,
    img: require('../../../assets/images/course_2.jpg'),
    link: '#',
    key: 2
  }, {
    title: 'Arithmetic',
    price: 99.00,
    subtitle: 'How To Create Mobile Apps Using Ionic',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium ipsam.',
    rating: 5,
    img: require('../../../assets/images/course_3.jpg'),
    link: '#',
    key: 3
  }, {
    title: 'Mobile Application 1',
    price: 99.00,
    subtitle: 'How To Create Mobile Apps Using Ionic',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium ipsam.',
    rating: 5,
    img: require('../../../assets/images/course_4.jpg'),
    link: '#',
    key: 4
  }, {
    title: 'Web Design 1',
    price: 99.00,
    subtitle: 'How To Create Mobile Apps Using Ionic',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium ipsam.',
    rating: 5,
    img: require('../../../assets/images/course_5.jpg'),
    link: '#',
    key: 5
  }, {
    title: 'Arithmetic 1',
    price: 99.00,
    subtitle: 'How To Create Mobile Apps Using Ionic',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique accusantium ipsam.',
    rating: 5,
    img: require('../../../assets/images/course_6.jpg'),
    link: '#',
    key: 6
  }
]

const PopularCourses = () => (
  <SiteSection
    title='Popular Courses'
    text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia, id?'
    className={cls.section}
    center
  >
    <Slider
      breakpoints={{ 0: 1, 510: 2, 1110: 3 }}
      margin='30px'
      dots='outside'
      controls
      items={ items.map(item => <PopularCoursesCard {...item} />) }
    />
  </SiteSection>
)

export default PopularCourses
