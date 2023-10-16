import s from "./Button.module.css";

type PropsType = {
  func: () => void;
  name: string;
};

const Button = (props: PropsType) => {
  return (
    <button className={s.button} onClick={props.func}>
      {props.name}
    </button>
  );
};

export default Button;
