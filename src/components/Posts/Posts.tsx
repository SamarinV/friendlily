import { ChangeEvent, useState } from "react";
import Post from "../Post/Post";
import s from "./Posts.module.css";
import Button from "../Button/Button";
import Block from "../Block/Block";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../redux/state";
import { addPost } from "../../redux/postsSlice";

const Posts = () => {
  const posts = useSelector((store: StateType) => store.posts);
  const user = useSelector((store: StateType) => store.user);

  const [inputValue, setInputValue] = useState("");
  const inputPostHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const dispatch = useDispatch();

  const addPostHandler = () => {
    dispatch(
      addPost({ text: inputValue, name: user.name, userAvatar: user.avatar })
    );
  };

  return (
    <>
      <Block>
        <input
          className={s.input}
          type="text"
          value={inputValue}
          onChange={inputPostHandler}
          placeholder="Что у вас нового?"
        ></input>
        <Button func={addPostHandler} name="Опубликовать" />
      </Block>
      {posts.map((post: any) => {
        return <Post key={post.id} post={post} />;
      })}
    </>
  );
};

export default Posts;
