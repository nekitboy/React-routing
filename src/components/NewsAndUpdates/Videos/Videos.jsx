import React from 'react'
import cls from './Videos.scss'
import Icon from '../../../UI/Icon/Icon'

const Videos = ({ videos }) => {
  return (
    <React.Fragment>
      {
        videos.slice(0, 2).map(video => (
          <a href={video.link} key={video.key} className={cls.video}>
            <span className={cls.play}>
              <Icon icon='play'/>
            </span>
            <img src={video.img} alt=""/>
          </a>
        ))
      }
    </React.Fragment>
  )
}

export default Videos
