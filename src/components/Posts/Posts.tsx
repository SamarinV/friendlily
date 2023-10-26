import { ChangeEvent, useState } from "react";
import { UserType } from "../../pages/ProfilePage/ProfilePage";
import Post from "../Post/Post";
import s from "./Posts.module.css";
import Button from "../Button/Button";
import Block from "../Block/Block";
import { v4 as uuidv4 } from "uuid";

type AllPostsType = {
  id: string;
  user: UserType;
  content: string;
  date: string;
}[];

type PropsType = {
  user: UserType;
};

const Posts = (props: PropsType) => {
  let posts: AllPostsType = [
    {
      id: "1",
      user: props.user,
      content: "Что сделать",
      date: "19.10.2023 9:56",
    },
    {
      id: "2",
      user: props.user,
      content: "чтобы все заработало?",
      date: "19.10.2023 9:57",
    },
  ];
  const [allPosts, setAllPosts] = useState(posts);
  const [inputValue, setInputValue] = useState("");
  const inputPostHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const addPost = () => {
    const date = new Date();
    setAllPosts([
      ...allPosts,
      {
        id: uuidv4(),
        user: props.user,
        content: inputValue,
        date: `${date.getDate()}.${
          date.getMonth() + 1
        }.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
      },
    ]);
    setInputValue("");
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
        <Button func={addPost} name="Опубликовать" />
      </Block>
      {allPosts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </>
  );
};

export default Posts;
