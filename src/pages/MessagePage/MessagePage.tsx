import Block from "../../components/Block/Block";
import s from "./MessagePage.module.css";

const MessagePage = () => {
  return (
    <div className={s.wrapper}>
      <Block>
        <h3>Чаты</h3>
      </Block>
      <Block>
        <h3>Выберите чат</h3>
      </Block>
    </div>
  );
};

export default MessagePage;
