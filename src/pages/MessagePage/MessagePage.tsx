import s from "./MessagePage.module.css";
import { useState } from "react";
import React from "react";
import Dialogs from "../../components/Dialogs/Dialogs";
import Messages from "../../components/Messages/Messages";

type InputWithButtonType = {
  id: string;
};

// const Input: React.FC<InputWithButtonType> = memo(({ id }) => {
//   // const dialogs = useSelector((store: StateType) => store.chats.dialogs);
//   const user = useSelector((store: StateType) => store.user);
//   const [inputValue, setInputValue] = useState("");
//   const dispatch = useDispatch();

//   const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setInputValue(event.target.value);
//   };
//   const sendHandler = () => {
//     dispatch(
//       sendMessage({
//         id: id,
//         text: inputValue,
//         user: user,
//       })
//     );
//     setInputValue(""); //обнуляем инпут
//   };
//   //Если изменился открытый чат, рисуем текст инпута нового чата
//   useEffect(() => {
//     setInputValue("");
//   }, [id]);
//   return (
//     <>
//       <input
//         className={s.input}
//         type="text"
//         value={inputValue}
//         onChange={inputChange}
//         placeholder="Здесь можно написать сообщение..."
//       />
//       <Button size="small" variant="contained" onClick={sendHandler}>
//         Отправить
//       </Button>
//     </>
//   );
// });

const MessagePage = () => {
  const [idOpenedChat, setIdOpenedChat] = useState("");

  return (
    <div className={s.wrapper}>
      <Dialogs setIdOpenedChat={setIdOpenedChat} />
      <Messages idOpenedChat={idOpenedChat} />
    </div>
  );
};

export default React.memo(MessagePage);
