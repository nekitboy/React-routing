import React from 'react'
import cls from './SubscribeToUs.scss'
import SiteSectionWithBg from '../../UI/SiteSection/SiteSectionWithBg/SiteSectionWithBg'
import Input from '../../UI/Input/Input'

const SubscribeToUs = () => (
  <SiteSectionWithBg bgImg={require('../../../assets/images/bg_1.jpg')} bigPadding bright>
    <div className={cls.subscribe}>
      <div className={cls.info}>
        <h2>Subscribe to us!</h2>
        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,</p>
      </div>
      <form action="" className={cls.form}>
        <Input type="text" placeholder='Enter your email'/>
        <Input type="submit" value='Send'/>
      </form>
    </div>
  </SiteSectionWithBg>
)

export default SubscribeToUs
