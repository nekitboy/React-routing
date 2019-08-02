import React from 'react'
import cls from './News.scss'

const News = ({ news }) => {
  return (
    <div>
      {
        news.slice(0, 4).map(newsItem => (
          <div className={cls.newsItem} key={newsItem.key}>
            <a href={newsItem.link} className={cls.img}>
              <img src={newsItem.img} alt=""/>
            </a>
            <div>
              <a href={newsItem.link}>{newsItem.date}</a>
              <span className={cls.delimeter}>/</span>
              {newsItem.categories.map((category, index, array) => (
                <React.Fragment key={category}>
                  <a href={newsItem.link}>{category}</a>
                  {
                    index !== array.length - 1 && ', '
                  }
                </React.Fragment>
              ))}
              <a href={newsItem.link} className={cls.text}><h3>{newsItem.text}</h3></a>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default News
