import React from 'react'
import cls from './TestimonialsCard.scss'

const TestimonialsCard = ({ avatar, name, info, text, style }) => (
  <div className={cls.card} style={style}>
    <header>
      <img src={avatar} alt=""/>
      <div>
        <h5>{name}</h5>
        <span>{info}</span>
      </div>
    </header>
    <p>
      {text}
    </p>
  </div>
)

export default TestimonialsCard
