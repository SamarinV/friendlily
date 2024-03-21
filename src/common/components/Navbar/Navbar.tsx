import s from "./Navbar.module.css"
import { ReactComponent as ProfileLogo } from "./assets/profile.svg"
import { ReactComponent as SettingLogo } from "./assets/setting.svg"
import { NavLink } from "react-router-dom"
import React, { memo } from "react"
import { AppRootStateType } from "app/store"
import { useSelector } from "react-redux"

type Props = {
  to: string
  logo: React.ReactNode
  text: string
}

const NavLinkWithLogo = ({ to, logo, text }: Props) => {
  return (
    <NavLink className={s.link} to={to}>
      {({ isActive }) => (
        <div className={s.displayFlex}>
          {logo}
          <span className={isActive ? `${s.linkActive}` : ""}>{text}</span>
        </div>
      )}
    </NavLink>
  )
}

const Navbar = () => {
  const authUserId = useSelector<AppRootStateType, number>((state) => state.auth.userData.id)
  return (
    <nav className={s.nav}>
      <NavLinkWithLogo to={`profile/${authUserId}`} logo={<ProfileLogo className={s.logo} />} text="Профиль" />
      <NavLinkWithLogo to="users" logo={<SettingLogo className={s.logo} />} text="Пользователи" />
      <NavLinkWithLogo to="setting" logo={<SettingLogo className={s.logo} />} text="Настройки" />
    </nav>
  )
}

export default React.memo(Navbar)
