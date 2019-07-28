import React, { useState } from 'react'
import cls from './Navigation.scss'
import { mainMenuLinks } from '../../../../data/navigation'
import Icon from '../../../../UI/Icon/Icon'
import mergeClasses from '../../../../utils/mergeClasses'

export default ({ isMenuOpen, closeMenu, innerRef }) => {
  const [isItemsOpened, setItemsOpen] = useState(mainMenuLinks.map(() => false))
  return (
    <nav className={mergeClasses(cls.nav, isMenuOpen && cls.open)} ref={innerRef}>
      <Icon icon='close2' className={cls.closeBtn} onClick={closeMenu}/>
      <ul>
        {mainMenuLinks.map((menuItem, index) => (
          <li
            key={menuItem.link + index}
            className={isItemsOpened[index] ? cls.opened : null}
          >
            <a href={menuItem.link}>
              {menuItem.text}
              {menuItem.items
                ? <Icon
                  icon='keyboard_arrow_down'
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setItemsOpen(
                      isItemsOpened.map((item, i) => index === i ? !item : item)
                    )
                  }}
                />
                : null}
            </a>
            {menuItem.items
              ? <ul className={cls.dropdown}>
                {menuItem.items.map((subItem, index) => (
                  <li key={subItem.link + 'd' + index}>
                    <a href={subItem.link}>{subItem.text}</a>
                  </li>
                ))}
              </ul>
              : null
            }
          </li>
        ))}
      </ul>
    </nav>
  )
}
