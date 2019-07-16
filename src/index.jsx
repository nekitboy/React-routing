import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

(function removeLoader () {
  const loader = document.getElementById('loader')
  loader.style.opacity = 0
  setTimeout(
    () => loader.remove(),
    300
  )
})()
