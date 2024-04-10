import UsersIcon from "@mui/icons-material/PeopleAlt"
import ProfileIcon from "@mui/icons-material/Person2"
import MessagesIcon from "@mui/icons-material/QuestionAnswer"
import SearchIcon from "@mui/icons-material/Search"
import { Button, useMediaQuery } from "@mui/material"
import Tooltip from "@mui/material/Tooltip"
import { selectorAuthUserId } from "features/auth/model/auth.selectors"
import React from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import s from "./Navbar.module.css"

type Props = {
  to: string
  logo: React.ReactNode
  textInfo: string
  openMenuHandler?: () => void
}

const style = {
  color: "#818181",
  width: "50px",
  height: "50px",
}

const NavLinkWithLogo = ({ to, logo, textInfo, openMenuHandler }: Props) => {
  const isSmallScreen = useMediaQuery("(max-width: 760px)")
  const closeBurgerMenu = () => {
    if (openMenuHandler) {
      openMenuHandler()
    }
  }
  return (
    <>
      {isSmallScreen ? (
        <div className={s.burgerLinkWrapper}>
          <NavLink onClick={closeBurgerMenu} className={s.link} to={to}>
            <Button>
              {logo}
              <span className={s.menuLinkText}>{textInfo}</span>
            </Button>
          </NavLink>
        </div>
      ) : (
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
      )}
    </>
  )
}

type NavbarProps = {
  openMenuHandler?: () => void
}

const Navbar = ({ openMenuHandler }: NavbarProps) => {
  const authUserId = useSelector(selectorAuthUserId)
  return (
    <nav className={s.nav}>
      <NavLinkWithLogo
        to={`profile/${authUserId}`}
        logo={<ProfileIcon sx={style} />}
        textInfo="Профиль"
        openMenuHandler={openMenuHandler}
      />
      <NavLinkWithLogo
        to="/dialogs"
        logo={<MessagesIcon sx={style} />}
        textInfo="Сообщения"
        openMenuHandler={openMenuHandler}
      />
      <NavLinkWithLogo
        to="/users?count=10&page=1&friend=true"
        logo={<UsersIcon sx={style} />}
        textInfo="Друзья"
        openMenuHandler={openMenuHandler}
      />
      <NavLinkWithLogo
        to="/users?count=10&page=1&friend=false"
        logo={<SearchIcon sx={style} />}
        textInfo="Пользователи"
        openMenuHandler={openMenuHandler}
      />
    </nav>
  )
}

export default React.memo(Navbar)
