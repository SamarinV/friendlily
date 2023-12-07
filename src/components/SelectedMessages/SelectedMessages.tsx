import { useSelector } from "react-redux";
import { StateType } from "../../redux/state";
import { Avatar, Paper } from "@mui/material";
import { useMemo } from "react";
import s from "./SelectedMessages.module.css";
import InputMessages from "../InputMessages/InputMessages";

type PropsType = {
  idOpenedChat: string;
};

const SelectedMessages = (props: PropsType) => {
  const messages = useSelector((store: StateType) => store.chats.dialogs);

  const selectedMessages = useMemo(() => {
    if (
      messages &&
      messages[props.idOpenedChat] &&
      messages[props.idOpenedChat].messages
    ) {
      return messages[props.idOpenedChat].messages.map((item) => (
        <Paper
          elevation={3}
          key={item.id}
          className={`${s.messageBlock} ${item.isMe && s.myMessages}`}
        >
          <Avatar alt={item.fullName} src={item.avatar} />
          <div className={s.margin}></div>
          <div className={s.messageNameAndText}>
            <span>{item.fullName}:</span>
            <span className={s.text}>{item.message}</span>
          </div>
        </Paper>
      ));
    }
  }, [props.idOpenedChat, messages]);

  return (
    <div className={s.chatWrapper}>
      <h3 className={s.chatTitle}>Выбраный чат</h3>
      {selectedMessages}
      <div className={s.blockWithInput}>
        <InputMessages id={props.idOpenedChat} />
      </div>
    </div>
  );
};

export default SelectedMessages;
