import React from 'react'
import cls from './Slide.scss'

export default ({ text, backgroundImg, style }) => (
  <div className={cls.Slide} style={{ backgroundImage: `url(${backgroundImg})`, ...style }}>
    <span className='container'>{text}</span>
  </div>
)
