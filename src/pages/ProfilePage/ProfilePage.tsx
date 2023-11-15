import s from "./ProfilePage.module.css";
import Posts from "../../components/Posts/Posts";
import Block from "../../components/Block/Block";
import { useSelector } from "react-redux";
import { StateType } from "../../redux/state";

const ProfilePage = () => {
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

  const user = useSelector((store: StateType) => store.user);
  return (
    <div className={s.wrapper}>
      <Block>
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
      </Block>
      <Posts />
    </div>
  );
};

export default ProfilePage;
