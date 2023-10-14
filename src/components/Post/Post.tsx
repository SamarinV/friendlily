import { PersonType } from "../Profile/Profile";
import s from "./Post.module.css";

type PropsType = {
  post: { id: number; person: PersonType; content: string };
};

const Post = (props: PropsType) => {
  return (
    <div className={s.block}>
      <img className={s.img} src={props.post.person.avatar} alt="Фото" />
      <div className={s.content}>
        <span
          className={s.name}
        >{`${props.post.person.name} ${props.post.person.lastName}`}</span>
        <div className={s.text}>{props.post.content}</div>
      </div>
    </div>
  );
};

export default Post;
