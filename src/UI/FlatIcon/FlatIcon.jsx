import React from 'react'
import cls from './FlatIcon.scss'
import mergeClasses from '../../utils/mergeClasses'

export default ({ icon, className }) => (
  <i className={mergeClasses(cls.flaticon, cls[icon], className)}/>
)
