import React from 'react'
import cls from './Socials.scss'
import Icon from '../../../../UI/Icon/Icon'
import mergeClasses from '../../../../utils/mergeClasses'

export default ({ toggleMenu }) => (
  <div className={cls.socials}>
    <SocialBtn link='facebook.com' icon='facebook'/>
    <SocialBtn link='twitter.com' icon='twitter'/>
    <SocialBtn link='linkedin.com' icon='linkedin'/>
    <SocialBtn icon='menu' className={cls.menuBtn} onClick={toggleMenu}/>
  </div>
)

const SocialBtn = ({ link, icon, className, onClick }) => (
  <a
    href={link}
    className={mergeClasses(cls.socialBtn, className)}
    onClick={onClick}
    aria-hidden
  >
    <Icon icon={icon}/>
  </a>
)
