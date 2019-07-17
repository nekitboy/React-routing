import React, { Fragment } from 'react'
import Header from './Header/Header'
import './BaseLayout.scss'

const BaseLayout = (props) => {
  return (
    <Fragment>
      <Header/>
      <main>
        {props.children}
      </main>
      {/* <Footer/> */}
    </Fragment>
  )
}

export default BaseLayout
