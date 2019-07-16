import React from 'react'
import TextIcon from '../../../../../UI/Icon/TextIcon'
import cls from './Action.scss'

export default ({ icon, text, link }) => (
  <a href={link} className={cls.action}>
    <TextIcon icon={icon}/>
    {text}
  </a>
)
