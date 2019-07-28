import React from 'react'
import cls from './FeatureItem.scss'
import FlatIcon from '../../../UI/FlatIcon/FlatIcon'

const FeatureItem = ({ icon, title, text }) => (
  <div className={cls.item}>
    <header>
      <FlatIcon icon={icon} className={cls.icon}/>
      <h4>{title}</h4>
    </header>
    <p>
      {text}
    </p>
  </div>
)

export default FeatureItem
