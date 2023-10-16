import { ChangeEvent, useState } from "react";
import { UserType } from "../../pages/Profile/Profile";
import Post from "../Post/Post";
import s from "./Posts.module.css";
import Button from "../Button/Button";

type AllPostsType = {
  id: number;
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
      id: 1,
      user: props.user,
      content: "Что сделать",
      date: "17.06.2023",
    },
    {
      id: 2,
      user: props.user,
      content: "чтобы все заработало?",
      date: "17.06.2023",
    },
  ];
  const [allPosts, setAllPosts] = useState(posts);
  const [inputValue, setInputValue] = useState("");
  const inputPostHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const addPost = () => {
    const newId = posts.length + 1;
    setAllPosts([
      ...allPosts,
      {
        id: newId,
        user: props.user,
        content: inputValue,
        date: `${new Date()}`,
      },
    ]);
    setInputValue("");
  };
  return (
    <>
      <div className={s.block}>
        <input
          className={s.input}
          type="text"
          value={inputValue}
          onChange={inputPostHandler}
          placeholder="Что у вас нового?"
        ></input>
        <Button func={addPost} name="Опубликовать" />
      </div>
      {allPosts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </>
  );
};

export default Posts;
