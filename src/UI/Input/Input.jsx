import React from 'react'
import cls from './Input.scss'
import mergeClasses from '../../utils/mergeClasses'

const Input = ({ className, type, ...props }) => (
  <input
    className={mergeClasses(cls.input, className, ['button', 'submit'].includes(type) && cls.button)}
    type={type}
    {...props}
  />
)

export default Input
