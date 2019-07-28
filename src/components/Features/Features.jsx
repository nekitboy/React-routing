import React from 'react'
import cls from './Features.scss'
import SiteSectionWithBg from '../../UI/SiteSection/SiteSectionWithBg/SiteSectionWithBg'

const Features = () => (
  <SiteSectionWithBg className={cls.section} bgImg={require('../../../assets/images/hero_1.jpg')}>
    <div>Features</div>
  </SiteSectionWithBg>
)

export default Features
