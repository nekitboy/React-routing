import React from 'react'
import cls from './NewsAndUpdates.scss'
import News from './News/News'
import Videos from './Videos/Videos'

const news = [
  {
    key: 0,
    date: 'JUNE 6, 2019',
    categories: ['ADMISSION', 'UPDATES'],
    text: 'Campus Camping and Learning Session',
    img: require('../../../assets/images/blog_large_1.jpg'),
    link: '#'
  }, {
    key: 1,
    date: 'JUNE 6, 2019',
    categories: ['ADMISSION', 'UPDATES'],
    text: 'Campus Camping and Learning Session',
    img: require('../../../assets/images/blog_1.jpg'),
    link: '#'
  }, {
    key: 2,
    date: 'JUNE 6, 2019',
    categories: ['ADMISSION', 'UPDATES'],
    text: 'Campus Camping and Learning Session',
    img: require('../../../assets/images/blog_2.jpg'),
    link: '#'
  }, {
    key: 3,
    date: 'JUNE 6, 2019',
    categories: ['ADMISSION', 'UPDATES'],
    text: 'Campus Camping and Learning Session',
    img: require('../../../assets/images/blog_1.jpg'),
    link: '#'
  }
]

const videos = [
  {
    key: 0,
    img: require('../../../assets/images/course_5.jpg'),
    link: 'https://vimeo.com/45830194'
  }, {
    key: 1,
    img: require('../../../assets/images/course_4.jpg'),
    link: 'https://vimeo.com/45830194'
  }
]

const NewsAndUpdates = () => {
  return (
    <div className={'container'}>
      <section className={cls.section}>
        <h2>News & Updates</h2>
        <a href="#">Read All News</a>
        <News news={news}/>
      </section>
      <section className={cls.section}>
        <h2>Campus Videos</h2>
        <a href="#">View All Videos</a>
        <Videos videos={videos}/>
      </section>
    </div>
  )
}

export default NewsAndUpdates
