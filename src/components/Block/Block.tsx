import s from "./Block.module.css";
import React from "react";

const Block: React.FC = ({ children }) => {
  return <div className={s.block}>{children}</div>;
};

export default Block;
