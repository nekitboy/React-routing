import React from 'react'
import cls from './SiteSection.scss'
import mergeClasses from '../../utils/mergeClasses'

export default ({ children, title, text, center }) => (
  <section className={mergeClasses(cls.section, 'container')}>
    <div className={mergeClasses(center && cls.center)}>
      <h2 className={cls.title}>{title}</h2>
      { text && <p className={cls.text}>{text}</p> }
    </div>
    {children}
  </section>
)
