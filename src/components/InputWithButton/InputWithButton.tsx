import { Button } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../redux/state";
import { addPost } from "../../redux/postsSlice";
import s from "./InputWithButton.module.css";
import React from "react";

type InputWithButtonType = {
  id?: string;
  placeholder: string;
  buttonName: string;
  actionCreator: any;
};

const InputWithButton: React.FC<InputWithButtonType> = ({
  id,
  placeholder,
  buttonName,
  actionCreator,
}) => {
  const [inputValue, setInputValue] = useState("");
  const user = useSelector((store: StateType) => store.user);
  const dispatch = useDispatch();

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const sendHandler = () => {
    //если есть id, значит идет отправка сообщения
    if (id) {
      dispatch(
        actionCreator({
          id: id,
          text: inputValue,
          user: user,
        })
      );
    }
    //иначе идет отправка поста
    else {
      dispatch(
        actionCreator({
          text: inputValue,
          name: user.name,
          userAvatar: user.avatar,
        })
      );
    }
    setInputValue("");
  };
  return (
    <>
      <input
        className={s.input}
        type="text"
        value={inputValue}
        onChange={inputChange}
        placeholder={placeholder}
      />
      <Button size="small" variant="contained" onClick={sendHandler}>
        {buttonName}
      </Button>
    </>
  );
};

export default React.memo(InputWithButton);
