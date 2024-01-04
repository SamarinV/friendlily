import s from "./Navbar.module.css";
import { ReactComponent as ProfileLogo } from "../../assets/navbar/profile.svg";
import { ReactComponent as MessageLogo } from "../../assets/navbar/message.svg";
import { ReactComponent as NewsLogo } from "../../assets/navbar/news.svg";
import { ReactComponent as MusicLogo } from "../../assets/navbar/music.svg";
import { ReactComponent as SettingLogo } from "../../assets/navbar/setting.svg";
import { NavLink } from "react-router-dom";
import React, { memo } from "react";
import { AppRootStateType } from "../../redux/store";
import { useSelector } from "react-redux";

type NavLinkWithLogoType = {
  to: string;
  logo: React.ReactNode;
  text: string;
};

const NavLinkWithLogo: React.FC<NavLinkWithLogoType> = memo(
  ({ to, logo, text }) => {
    return (
      <NavLink className={s.link} to={to}>
        {({ isActive }) => (
          <div className={s.displayFlex}>
            {logo}
            <span className={isActive ? `${s.linkActive}` : ""}>{text}</span>
          </div>
        )}
      </NavLink>
    );
  }
);

const Navbar = () => {
  const authUserId = useSelector<AppRootStateType, number>(
    (state) => state.auth.id
  );
  return (
    <nav className={s.nav}>
      <NavLinkWithLogo
        to={`profile/${authUserId}`}
        logo={<ProfileLogo className={s.logo} />}
        text="Профиль"
      />
      <NavLinkWithLogo
        to="message"
        logo={<MessageLogo className={s.logo} />}
        text="Сообщения"
      />
      <NavLinkWithLogo
        to="users"
        logo={<NewsLogo className={s.logo} />}
        text="Пользователи"
      />
      <NavLinkWithLogo
        to="music"
        logo={<MusicLogo className={s.logo} />}
        text="Музыка"
      />
      <NavLinkWithLogo
        to="setting"
        logo={<SettingLogo className={s.logo} />}
        text="Настройки"
      />
    </nav>
  );
};

export default React.memo(Navbar);
