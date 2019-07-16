import React from 'react'
import cls from './Button.scss'
import mergeClasses from '../../utils/mergeClasses'

export default ({ onClick, className, children }) => (
  <button className={mergeClasses(cls.button, className)} onClick={onClick}>
    {children}
  </button>
)
