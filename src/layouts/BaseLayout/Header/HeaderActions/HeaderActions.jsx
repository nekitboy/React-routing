import React from 'react'
import cls from './HeaderActions.scss'
import Action from './Action/Action'
import Icon from '../../../../UI/Icon/Icon'
import mergeClasses from '../../../../utils/mergeClasses'
import LinkButton from '../../../../UI/Button/LinkButton'

export default () => (
  <div className={cls.headerActions}>
    <div className={mergeClasses('container', cls.actionsWrap)}>
      <div className={cls.left}>
        <Action icon='question-circle-o' text='&nbsp;Have a questions?' link='#'/>
        <Action icon='phone2' text='&nbsp;10 20 123 456' link='#'/>
        <Action icon='envelope-o' text='&nbsp;info@mydomain.com' link='#'/>
      </div>
      <div className={cls.right}>
        <a className={cls.login} href="/login">
          <Icon icon='unlock-alt'/>
          &nbsp;Log in
        </a>
        <LinkButton link='/register' text='&nbsp;Register' icon='users'/>
      </div>
    </div>
  </div>
)
