import { useEffect, useState } from "react"
import { UserType } from "../api/users-api"
import s from "./Users.module.css"
import { Avatar, Button, ButtonGroup } from "@mui/material"
import Block from "common/components/Block/Block"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { AppRootStateType } from "app/store"
import { usersThunks } from "../model/users.slice"
import { useAppDispatch } from "common/hooks/useAppDispatch"

const UsersPage = () => {
  const users = useSelector<AppRootStateType, UserType[]>((state) => state.users.users)
  const followInProgress = useSelector<AppRootStateType, number[]>((state) => state.users.folloInProgress)
  const [page, setPage] = useState(1)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(usersThunks.fetchUsers(page))
  }, [])

  const fetchUsersHandler = () => {
    setPage(page + 1)
    dispatch(usersThunks.fetchUsers(page + 1))
    window.scrollTo(0, 0)
  }

  const followHandler = (id: number) => {
    dispatch(usersThunks.followUser(id))
  }

  const unFollowHandler = (id: number) => {
    dispatch(usersThunks.unFollowUser(id))
  }

  const showFriendsHandler = () => {
    dispatch(usersThunks.getFriends())
  }

  const showAllUsersHandler = () => {
    dispatch(usersThunks.fetchUsers(page))
  }

  return (
    <div className={s.usersList}>
      <div className={s.buttonGroup}>
        <ButtonGroup variant="text" aria-label="Basic button group">
          <Button onClick={showFriendsHandler}>Мои друзья</Button>
          <Button onClick={showAllUsersHandler}>Все пользователи</Button>
        </ButtonGroup>
      </div>
      {users &&
        users.map((u) => {
          return (
            <Block key={u.id}>
              <div className={s.userWrapper}>
                <div className={s.user}>
                  <NavLink to={`/profile/${u.id}`}>
                    <Avatar
                      sx={{ height: "60px", width: "60px" }}
                      src={u.photos.small ? u.photos.small : ""}
                      alt="Фото"
                    />
                  </NavLink>
                  <div className={s.blockNameStatus}>
                    <span>{u.name}</span>
                    {u.status ? (
                      <span className={s.status}>Статус: {u.status}</span>
                    ) : (
                      <span className={s.status}>Статус не указан</span>
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => {
                    u.followed ? unFollowHandler(u.id) : followHandler(u.id)
                  }}
                  disabled={followInProgress.some((id) => id === u.id)}
                >
                  {u.followed ? "Отписаться" : "Подписаться"}
                </Button>
              </div>
            </Block>
          )
        })}
      <Button onClick={fetchUsersHandler}>Загрузить ещё</Button>
    </div>
  )
}

export default UsersPage
