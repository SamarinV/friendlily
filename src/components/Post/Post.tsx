import { Avatar } from "@mui/material";
import { PostType } from "../../redux/state";
import Block from "../Block/Block";
import s from "./Post.module.css";
import React from "react";

type PropsType = {
  post: PostType;
};

const Post = (props: PropsType) => {
  return (
    <Block>
      <Avatar className={s.img} src={props.post.userAvatar} alt="Фото" />
      <div className={s.content}>
        <div className={s.nameAndDate}>
          <span className={s.name}>{props.post.user}</span>

          <span className={s.date}>{props.post.date}</span>
        </div>
        <div className={s.text}>{props.post.message}</div>
      </div>
    </Block>
  );
};

export default React.memo(Post);
