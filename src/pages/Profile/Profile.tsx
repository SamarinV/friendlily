import { ChangeEvent, useState } from "react";
import Post from "../../components/Post/Post";
import s from "./Profile.module.css";
import Posts from "../../components/Posts/Posts";

export type UserType = {
  id: number;
  link: string;
  avatar: string;
  name: string;
  lastName: string;
  city: string;
  birthday: string;
};

const user: UserType = {
  id: 1,
  link: "",
  avatar: "https://coolsen.ru/wp-content/uploads/2021/06/186-2.jpg",
  name: "Владимир",
  lastName: "Самарин",
  city: "Геленджик",
  birthday: "18.08.1992",
};

// type AllPostsType = {
//   id: number;
//   user: UserType;
//   content: string;
//   date: string;
// }[];

// let posts: AllPostsType = [
//   {
//     id: 1,
//     user: user,
//     content: "Что сделать",
//     date: "17.06.2023",
//   },
//   {
//     id: 2,
//     user: user,
//     content: "чтобы все заработало?",
//     date: "17.06.2023",
//   },
// ];

const Profile = () => {
  // const [inputValue, setInputValue] = useState("");
  // const inputPostHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(event.target.value);
  // };
  // const addPost = () => {
  //   const newId = posts.length + 1;
  //   posts = [
  //     ...posts,
  //     { id: newId, user: user, content: inputValue, date: `${new Date()}` },
  //   ];
  //   setInputValue("");
  // };
  return (
    <div className={s.wrapper}>
      <div className={s.block}>
        <img className={s.img} src={user.avatar} alt="Фото пользователя" />
        <div className={s.person}>
          <div className={s.description}>
            <span>
              {user.name} {user.lastName}
            </span>
          </div>
          <div className={s.description}>
            <span>Город: {user.city}</span>
          </div>
          <div className={s.description}>
            <span>Дата рождения: {user.birthday}</span>
          </div>
        </div>
      </div>
      <Posts user={user}></Posts>
    </div>
  );
};

export default Profile;
