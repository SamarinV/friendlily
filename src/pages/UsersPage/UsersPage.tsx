import { SetStateAction, useEffect, useState } from "react";
import { UserType, usersAPI } from "../../api/users-api";
import s from "./UserPage.module.css";
import { Avatar, Button } from "@mui/material";
import Block from "../../components/Block/Block";

const UsersPage = () => {
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [pagesCount, setPagesCount] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    usersAPI.getUsers(page).then((res) => {
      setUsers(res.data.items);
      const itemsCount = res.data.totalCount;
      if (itemsCount % 20 === 0) {
        setPagesCount(itemsCount / 20);
      } else {
        setPagesCount(Math.ceil(itemsCount / 20));
      }
    });
  }, []);

  const onclickHandler = () => {
    setPage(page + 1);
    usersAPI.getUsers(page + 1).then((res) => {
      setUsers(res.data.items);
    });
  };
  return (
    <div className={s.usersList}>
      {users &&
        users.map((u) => {
          return (
            <Block>
              <Avatar
                className={s.img}
                src={u.photos.small ? u.photos.small : ""}
                alt="Фото"
              />
              <div className={s.blockNameStatus}>
                <span>{u.name}</span>
                <span>{u.status}</span>
              </div>
            </Block>
          );
        })}
      <Button onClick={onclickHandler}>Загрузить ещё</Button>
    </div>
  );
};

export default UsersPage;

// followed:false
// id:30467
// name:"Rukavyshnykov"
// photos:{small: null, large: null}
// status:null
// uniqueUrlName:null
