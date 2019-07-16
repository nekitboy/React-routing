import React from 'react'
import Icon from '../Icon/Icon'
import cls from './Button.scss'

export default ({ link, text, icon }) => (
  <a href={link} className={cls.button}>
    { icon ? <Icon icon={icon}/> : null }
    { text }
  </a>
)
