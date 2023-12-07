import { useMemo } from "react";
import Block from "../Block/Block";
import { Avatar, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { StateType } from "../../redux/state";
import SelectedMessages from "../SelectedMessages/SelectedMessages";
import s from "./Messages.module.css";

import { ReactComponent as IconChatWithoutUser } from "../../assets/chatWithoutUser.svg";

type PropsType = {
  idOpenedChat: string;
};

const Messages = (props: PropsType) => {
  // const messages = useSelector((store: StateType) => store.chats.dialogs);
  // const selectedMessages = useMemo(() => {
  //   if (
  //     messages &&
  //     messages[props.idOpenedChat] &&
  //     messages[props.idOpenedChat].messages
  //   ) {
  //     return messages[props.idOpenedChat].messages.map((item) => (
  //       <Paper
  //         elevation={3}
  //         key={item.id}
  //         className={`${s.messageBlock} ${item.isMe && s.myMessages}`}
  //       >
  //         <Avatar alt={item.fullName} src={item.avatar} />
  //         <div className={s.margin}></div>
  //         <div className={s.messageNameAndText}>
  //           <span>{item.fullName}:</span>
  //           <span className={s.text}>{item.message}</span>
  //         </div>
  //       </Paper>
  //     ));
  //   }
  // }, [props.idOpenedChat, messages]);
  return (
    <Block>
      {props.idOpenedChat ? ( // Проверяем, выбран ли чат
        <SelectedMessages idOpenedChat={props.idOpenedChat} />
      ) : (
        <span className={s.chatWithoutUser}>
          Выберите чат
          <IconChatWithoutUser className={s.iconWithoutUser} />
        </span>
      )}
    </Block>
  );
};

export default Messages;
