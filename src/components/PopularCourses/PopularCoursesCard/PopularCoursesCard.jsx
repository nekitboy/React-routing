import React from 'react'
import cls from './PopularCoursesCard.scss'
import Icon from '../../../UI/Icon/Icon'
import LinkButton from '../../../UI/Button/LinkButton'

const PopularCoursesCard = ({ title, price, subtitle, text, rating, img, style, link }) => {
  const ratingComponents = []
  for (let i = 0; i < rating; i++) {
    ratingComponents.push(<Icon icon='star2' key={i} />)
  }
  return (
    <div style={style} className={cls.Card}>
      <a href={link} ><img src={img} alt=""/></a>
      <div className={cls.price}>${price.toFixed(2)}</div>
      <h2>{title}</h2>
      <div className={cls.content}>
        <h3>{subtitle}</h3>
        <div className={cls.iconWrapper}>
          {ratingComponents}
        </div>
        <p>{text}</p>
        <LinkButton link={link} text='Enroll in This Course'/>
      </div>

    </div>
  )
}

export default PopularCoursesCard
