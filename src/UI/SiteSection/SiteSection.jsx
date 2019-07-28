import React from 'react'
import cls from './SiteSection.scss'
import mergeClasses from '../../utils/mergeClasses'

const SiteSection = ({ children, title, text, center, className, leftside }) => {
  return (
    <section className={mergeClasses(cls.section, 'container', className, leftside && cls.leftside)}>
      { (title || text) &&
        <div className={mergeClasses(center && cls.center, leftside && cls.leftside)}>
          <h2 className={cls.title}>{title}</h2>
          { text && <p className={cls.text}>{text}</p> }
        </div>
      }
      {leftside ? <div>{children}</div> : children}
    </section>
  )
}

export default SiteSection
