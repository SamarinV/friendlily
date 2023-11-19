import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import Post from "../Post/Post";
import s from "./Posts.module.css";
import Block from "../Block/Block";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../redux/state";
import { addPost } from "../../redux/postsSlice";
import Button from "@mui/material/Button";
import React from "react";
import InputWithButton from "../InputWithButton/InputWithButton";

// const InputPost = () => {
//   const [inputValue, setInputValue] = useState("");
//   const user = useSelector((store: StateType) => store.user);
//   const dispatch = useDispatch();

//   const inputPostHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     setInputValue(event.target.value);
//   };
//   const addPostHandler = () => {
//     dispatch(
//       addPost({ text: inputValue, name: user.name, userAvatar: user.avatar })
//     );
//     setInputValue("");
//   };
//   return (
//     <>
//       <input
//         className={s.input}
//         type="text"
//         value={inputValue}
//         onChange={inputPostHandler}
//         placeholder="Что у вас нового?"
//       />
//       <Button size="small" variant="contained" onClick={addPostHandler}>
//         Опубликовать
//       </Button>
//     </>
//   );
// };

const Posts = () => {
  const posts = useSelector((store: StateType) => store.posts);
  const postsList = useMemo(() => {
    return posts.map((post: any) => {
      return <Post key={post.id} post={post} />;
    });
  }, [posts]);

  return (
    <>
      <Block>
        <InputWithButton
          placeholder="Что у вас нового?"
          buttonName="Отправить"
          actionCreator={addPost}
        />
      </Block>
      {postsList}
    </>
  );
};

export default React.memo(Posts);
