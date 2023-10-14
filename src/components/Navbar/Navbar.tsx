import { Link } from "react-router-dom";
import s from "./Navbar.module.css";
import { ReactComponent as ProfileLogo } from "../../assets/profile.svg";
import { ReactComponent as MessageLogo } from "../../assets/message.svg";
import { ReactComponent as NewsLogo } from "../../assets/news.svg";
import { ReactComponent as MusicLogo } from "../../assets/music.svg";
import { ReactComponent as SettingLogo } from "../../assets/setting.svg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <NavLink className={s.link} to="/profile">
        {({ isActive }) => (
          <div className={s.displayFlex}>
            <ProfileLogo className={s.logo} />
            <span className={isActive ? `${s.linkActive}` : ""}>Профиль</span>
          </div>
        )}
      </NavLink>
      <NavLink className={s.link} to="/message">
        {({ isActive }) => (
          <div className={s.displayFlex}>
            <MessageLogo className={s.logo} />
            <span className={isActive ? `${s.linkActive}` : ""}>Сообщения</span>
          </div>
        )}
      </NavLink>

      <NavLink className={s.link} to="/news">
        {({ isActive }) => (
          <div className={s.displayFlex}>
            <NewsLogo className={s.logo} />
            <span className={isActive ? `${s.linkActive}` : ""}>Новости</span>
          </div>
        )}
      </NavLink>

      <NavLink className={s.link} to="/music">
        {({ isActive }) => (
          <div className={s.displayFlex}>
            <MusicLogo className={s.logo} />
            <span className={isActive ? `${s.linkActive}` : ""}>Музыка</span>
          </div>
        )}
      </NavLink>

      <NavLink className={s.link} to="/setting">
        {({ isActive }) => (
          <div className={s.displayFlex}>
            <SettingLogo className={s.logo} />
            <span className={isActive ? `${s.linkActive}` : ""}>Настройки</span>
          </div>
        )}
      </NavLink>
    </nav>
  );
};

export default Navbar;

{
  /* <NavLink
  to="/order-feed"
  className={`text text_type_main-default ${styles.link}`}
>
  {({ isActive }) => (
    <>
      <ListIcon type="primary" />
      <span className={isActive ? `${styles.linkActive}` : ""}>
        Лента заказов
      </span>
    </>
  )}
</NavLink>; */
}
