import React from 'react'
import cls from './FeatureCard.scss'
import FlatIcon from '../../../UI/FlatIcon/FlatIcon'
import LinkButton from '../../../UI/Button/LinkButton'

export default ({ icon, title, text, link }) => (
  <div>
    <div className={cls.icon}>
      <FlatIcon icon={icon}/>
    </div>
    <h3>{title}</h3>
    <p>{text}</p>
    <LinkButton text='Learn more' link={link}/>
  </div>
)
