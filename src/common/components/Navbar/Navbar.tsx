import UsersIcon from "@mui/icons-material/PeopleAlt"
import ProfileIcon from "@mui/icons-material/Person2"
import MessagesIcon from "@mui/icons-material/QuestionAnswer"
import SearchIcon from "@mui/icons-material/Search"
import { Button } from "@mui/material"
import Tooltip from "@mui/material/Tooltip"
import { AppRootStateType } from "app/store"
import React from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import s from "./Navbar.module.css"

type Props = {
  to: string
  logo: React.ReactNode
  textInfo: string
}

const style = {
  color: "#818181",
  width: "50px",
  height: "50px",
}

const NavLinkWithLogo = ({ to, logo, textInfo }: Props) => {
  return (
    <>
      <NavLink className={s.link} to={to}>
        {({ isActive }) => (
          <Tooltip title={textInfo} placement="right">
            <Button>
              {logo}
              <span className={isActive ? `${s.linkActive}` : ""}></span>
            </Button>
          </Tooltip>
        )}
      </NavLink>
    </>
  )
}

const Navbar = () => {
  const authUserId = useSelector<AppRootStateType, number>((state) => state.auth.userData.id)
  return (
    <nav className={s.nav}>
      <NavLinkWithLogo to={`profile/${authUserId}`} logo={<ProfileIcon sx={style} />} textInfo="Профиль" />
      <NavLinkWithLogo to="/dialogs" logo={<MessagesIcon sx={style} />} textInfo="Сообщения" />
      <NavLinkWithLogo to="/users?count=10&page=1&friend=true" logo={<UsersIcon sx={style} />} textInfo="Мои друзья" />
      <NavLinkWithLogo
        to="/users?count=10&page=1&friend=false"
        logo={<SearchIcon sx={style} />}
        textInfo="Поиск пользователей"
      />
    </nav>
  )
}

export default React.memo(Navbar)
