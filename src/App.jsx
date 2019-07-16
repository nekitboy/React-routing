import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './styles.scss'
import Layout from './layouts/BaseLayout/BaseLayout'

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/'>
            Home
          </Route>
          <Route exact path='/login'>
            Login
          </Route>
          <Route exact path='news'>
            News
          </Route>
          <Route exact path='profile'>
            Profile
          </Route>
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
