import Post from "../Post/Post";
import s from "./Profile.module.css";

export type PersonType = {
  id: number;
  link: string;
  avatar: string;
  name: string;
  lastName: string;
  city: string;
  birthday: string;
};

const person: PersonType = {
  id: 1,
  link: "",
  avatar: "https://coolsen.ru/wp-content/uploads/2021/06/186-2.jpg",
  name: "Владимир",
  lastName: "Самарин",
  city: "Геленджик",
  birthday: "18.08.1992",
};

type AllPostsType = {
  id: number;
  person: PersonType;
  content: string;
  date: string;
}[];

const posts: AllPostsType = [
  {
    id: 1,
    person: person,
    content: "Что сделать",
    date: "17.06.2023",
  },
  {
    id: 2,
    person: person,
    content: "чтобы все заработало?",
    date: "17.06.2023",
  },
];

const Profile = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.block}>
        <img className={s.img} src={person.avatar} alt="Фото пользователя" />
        <div className={s.person}>
          <div className={s.description}>
            <span>
              {person.name} {person.lastName}
            </span>
          </div>
          <div className={s.description}>
            <span>Город: {person.city}</span>
          </div>
          <div className={s.description}>
            <span>Дата рождения: {person.birthday}</span>
          </div>
        </div>
      </div>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
};

export default Profile;
