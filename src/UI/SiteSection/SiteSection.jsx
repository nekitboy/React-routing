import React from 'react'
import cls from './SiteSection.scss'
import mergeClasses from '../../utils/mergeClasses'

export default ({ children, title, center }) => (
  <section className={mergeClasses(cls.section, 'container')}>
    <div className={center && cls.center}>
      <h2 className={cls.title}>{title}</h2>
    </div>
    {children}
  </section>
)
