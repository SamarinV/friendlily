import s from "./Navbar.module.css";
import { ReactComponent as ProfileLogo } from "../../assets/profile.svg";
import { ReactComponent as MessageLogo } from "../../assets/message.svg";
import { ReactComponent as NewsLogo } from "../../assets/news.svg";
import { ReactComponent as MusicLogo } from "../../assets/music.svg";
import { ReactComponent as SettingLogo } from "../../assets/setting.svg";
import { NavLink } from "react-router-dom";
import React, { memo } from "react";

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
  return (
    <nav className={s.nav}>
      <NavLinkWithLogo
        to="profile"
        logo={<ProfileLogo className={s.logo} />}
        text="Профиль"
      />
      <NavLinkWithLogo
        to="message"
        logo={<MessageLogo className={s.logo} />}
        text="Сообщения"
      />
      <NavLinkWithLogo
        to="news"
        logo={<NewsLogo className={s.logo} />}
        text="Новости"
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
