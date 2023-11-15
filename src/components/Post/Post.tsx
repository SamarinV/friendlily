import { PostType } from "../../redux/state";
import Block from "../Block/Block";
import s from "./Post.module.css";

// type PostType = {
//   id: string;
//   user: any;
//   userAvatar: string;
//   content: string;
//   date: string;
// };

type PropsType = {
  post: PostType;
};

const Post = (props: PropsType) => {
  return (
    <Block>
      <img className={s.img} src={props.post.userAvatar} alt="Фото" />
      <div className={s.content}>
        <div className={s.nameAndDate}>
          <span className={s.name}>{props.post.user}</span>

          <span className={s.date}>{props.post.date}</span>
        </div>
        <div className={s.text}>{props.post.content}</div>
      </div>
    </Block>
  );
};

export default Post;
