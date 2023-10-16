import { UserType } from "../../pages/Profile/Profile";
import s from "./Post.module.css";

type PropsType = {
  post: { id: number; user: UserType; content: string; date: string };
};

const Post = (props: PropsType) => {
  return (
    <div className={s.block}>
      <img className={s.img} src={props.post.user.avatar} alt="Фото" />
      <div className={s.content}>
        <span
          className={s.name}
        >{`${props.post.user.name} ${props.post.user.lastName}`}</span>
        <div className={s.text}>{props.post.content}</div>
      </div>
      <div>{props.post.date}</div>
    </div>
  );
};

export default Post;
