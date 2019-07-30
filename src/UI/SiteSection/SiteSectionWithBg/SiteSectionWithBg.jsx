import React from 'react'
import cls from './SiteSectionWithBg.scss'
import mergeClasses from '../../../utils/mergeClasses'
import SiteSection from '../SiteSection'

const SiteSectionWithBg = ({ className, bgImg, bigPadding, bright, ...props }) => (
  <div className={cls.wrapper} style={{ backgroundImage: bgImg ? `url(${bgImg}` : null }}>
    <SiteSection
      {...props}
      className={mergeClasses(cls.section, !bigPadding && cls.smallPadding, className, bright && cls.bright)}/>
  </div>
)

export default SiteSectionWithBg
