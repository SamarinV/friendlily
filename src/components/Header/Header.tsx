import { useCallback, useState } from "react";
import s from "./Header.module.css";

const Header = () => {
  return (
    <div>
      <header className={s.header}>
        <div className={s.iconTitleWrapper}>
          <div className={s.icon}>
            <span>ВЧ</span>
          </div>
          <span className={s.title}>ВЧАТЕ</span>
        </div>
        <div></div>
      </header>
    </div>
  );
};

export default Header;
