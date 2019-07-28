import React from 'react'
import cls from './AboutOurUniversity.scss'
import SiteSectionWithBg from '../../UI/SiteSection/SiteSectionWithBg/SiteSectionWithBg'

const AboutOurUniversity = () => {
  return (
      <SiteSectionWithBg title='About Our University' className={cls.section} leftside>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem nesciunt quaerat ad reiciendis perferendis
          voluptate fugiat sunt fuga error totam.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus assumenda omnis tempora ullam alias
          amet eveniet voluptas, incidunt quasi aut officiis porro ad, expedita saepe necessitatibus rem debitis
          architecto dolore? Nam omnis sapiente placeat blanditiis voluptas dignissimos, itaque fugit a laudantium
          adipisci dolorem enim ipsum cum molestias? Quod quae molestias modi fugiat quisquam. Eligendi recusandae
          officiis debitis quas beatae aliquam?
        </p>
        <a href="#" className={cls.link}>Read more</a>
      </SiteSectionWithBg>
  )
}

export default AboutOurUniversity
