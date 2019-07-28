import React from 'react'
import cls from './SubscribeToUs.scss'
import SiteSectionWithBg from '../../UI/SiteSection/SiteSectionWithBg/SiteSectionWithBg'

const SubscribeToUs = () => (
  <SiteSectionWithBg bgImg={require('../../../assets/images/bg_1.jpg')} bigPadding>
    <div className={cls.subscribe}>
      <div className={cls.info}>
        <h2>Subscribe to us!</h2>
        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,</p>
      </div>
      <form action="" className={cls.form}>
        <input type="text"/>
        <input type="submit"/>
      </form>
    </div>
  </SiteSectionWithBg>
)

export default SubscribeToUs
