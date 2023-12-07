import { Button } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../redux/state";
import { addPost } from "../../redux/postsSlice";
import s from "./InputPost.module.css";

const InputPost = () => {
  const [inputValue, setInputValue] = useState("");
  const user = useSelector((store: StateType) => store.user);
  const dispatch = useDispatch();

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const sendHandler = () => {
    dispatch(
      addPost({
        text: inputValue,
        name: user.name,
        userAvatar: user.avatar,
      })
    );
    setInputValue("");
  };
  return (
    <>
      <input
        className={s.input}
        type="text"
        value={inputValue}
        onChange={inputChange}
        placeholder="Текст поста"
      />
      <Button size="small" variant="contained" onClick={sendHandler}>
        Отправить
      </Button>
    </>
  );
};

export default InputPost;
