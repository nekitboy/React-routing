import React from 'react'
import mergeClasses from '../../utils/mergeClasses'
import cls from './Icon.scss'

export default ({ icon, className }) => (
  <i className={mergeClasses(cls.icon, cls[icon], className)} aria-hidden/>
)
