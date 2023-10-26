import { UserType } from "../../pages/ProfilePage/ProfilePage";
import Block from "../Block/Block";
import s from "./Post.module.css";

type PropsType = {
  post: { id: string; user: UserType; content: string; date: string };
};

const Post = (props: PropsType) => {
  return (
    <Block>
      <img className={s.img} src={props.post.user.avatar} alt="Фото" />
      <div className={s.content}>
        <div className={s.nameAndDate}>
          <span
            className={s.name}
          >{`${props.post.user.name} ${props.post.user.lastName}`}</span>

          <span className={s.date}>{props.post.date}</span>
        </div>
        <div className={s.text}>{props.post.content}</div>
      </div>
    </Block>
  );
};

export default Post;
