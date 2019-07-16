import React from 'react'
import cls from './Loader.scss'
import mergeClasses from '../../utils/mergeClasses'
import DelayedUnmounting from '../../components/HOC/DelayedUnmounting'

const Loader = ({ mode, hide }) => (
  <div
    className={mergeClasses(cls.loader, mode === 'fullscreen' && cls.fullscreen, mode === 'single' && cls.single, hide && cls.hide)}
  >
    <svg className={cls.circular} width="48px" height="48px">
      <circle cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee"/>
      <circle
        className={cls.path} cx="24" cy="24" r="22"
        fill="none" strokeWidth="4" strokeMiterlimit="10"
        stroke="#51be78"/>
    </svg>
  </div>
)

export default DelayedUnmounting(Loader, 0.2)
