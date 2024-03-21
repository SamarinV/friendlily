import s from "./Header.module.css";

const Header = () => {
  return (
    <div>
      <header className={s.header}>
        <div className={s.iconTitleWrapper}>
          <div className={s.icon}>
            <span>SN</span>
          </div>
          <span className={s.title}>Social Network</span>
        </div>
        <div></div>
      </header>
    </div>
  );
};

export default Header;
