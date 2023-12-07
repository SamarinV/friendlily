import { Button } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../redux/state";
import { sendMessage } from "../../redux/chatsSlice";
import s from "./InputMessages.module.css";

type PropsType = {
  id: string;
};

const InputMessages: React.FC<PropsType> = ({ id }) => {
  const user = useSelector((store: StateType) => store.user);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const sendHandler = () => {
    dispatch(
      sendMessage({
        id: id,
        text: inputValue,
        user: user,
      })
    );
    setInputValue("");
  };
  //Если изменился открытый чат, затираем input
  useEffect(() => {
    setInputValue("");
  }, [id]);
  return (
    <>
      <input
        className={s.input}
        type="text"
        value={inputValue}
        onChange={inputChange}
        placeholder="Здесь можно написать сообщение..."
      />
      <Button size="small" variant="contained" onClick={sendHandler}>
        Отправить
      </Button>
    </>
  );
};

export default React.memo(InputMessages);
