import React from 'react'
import cls from './Features.scss'
import SiteSectionWithBg from '../../UI/SiteSection/SiteSectionWithBg/SiteSectionWithBg'
import FeatureItem from './FeatureItem/FeatureItem'

const items = [
  {
    title: 'Our Philosphy',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis recusandae, iure repellat quis ' +
      'delectus ea? Dolore, amet reprehenderit.',
    icon: 'mortarboard'
  }, {
    title: 'Academics Principle',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis recusandae, iure repellat quis ' +
      'delectus ea? Dolore, amet reprehenderit.',
    icon: 'school-material'
  }, {
    title: 'Key of Success',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis recusandae, iure repellat quis ' +
      'delectus ea? Dolore, amet reprehenderit.',
    icon: 'library'
  }
]

const Features = () => (
  <SiteSectionWithBg className={cls.section} bgImg={require('../../../assets/images/hero_1.jpg')}>
    {
      items.map((item, index) => (
        <FeatureItem key={index} {...item}/>
      ))
    }
  </SiteSectionWithBg>
)

export default Features
