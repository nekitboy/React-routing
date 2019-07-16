import React from 'react'
import cls from './Header.scss'
// eslint-disable-next-line no-unused-vars
import { mainMenuLinks } from '../../../data/navigation'
import HeaderActions from './HeaderActions/HeaderActions'

const Header = () => {
  return (
    <React.Fragment>
      <HeaderActions/>
      <header className={cls.header}>

      </header>
    </React.Fragment>
  )
}

export default Header
