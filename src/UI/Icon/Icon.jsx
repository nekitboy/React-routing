import React from 'react'
import mergeClasses from '../../utils/mergeClasses'
import cls from './Icon.scss'

const Icon = ({ icon, className, onClick }) => (
  <i
    className={mergeClasses(cls.icon, cls[icon], className)}
    onClick={onClick}
    aria-hidden
  />
)

export default Icon
