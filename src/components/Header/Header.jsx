import React from 'react'
import HeaderActions from './HeaderActions/HeaderActions'
import MainHeader from './MainHeader/MainHeader'

const Header = () => {
  return (
    <React.Fragment>
      <HeaderActions/>
      <MainHeader/>
    </React.Fragment>
  )
}

export default Header
