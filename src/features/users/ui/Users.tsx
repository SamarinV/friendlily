import { useEffect, useState } from "react"
import { UserType } from "../api/users-api"
import s from "./Users.module.css"
import { Avatar, Button } from "@mui/material"
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

  return (
    <div className={s.usersList}>
      {users &&
        users.map((u) => {
          return (
            <Block key={u.id}>
              <NavLink to={`/profile/${u.id}`}>
                <Avatar className={s.img} src={u.photos.small ? u.photos.small : ""} alt="Фото" />
              </NavLink>
              <div className={s.blockNameStatus}>
                <span>{u.name}</span>
                {u.status ? (
                  <span className={s.status}>Статус: {u.status}</span>
                ) : (
                  <span className={s.status}>Статус не указан</span>
                )}
              </div>
              <Button
                onClick={() => {
                  u.followed ? unFollowHandler(u.id) : followHandler(u.id)
                }}
                disabled={followInProgress.some((id) => id === u.id)}
              >
                {u.followed ? "Отписаться" : "Подписаться"}
              </Button>
            </Block>
          )
        })}
      <Button onClick={fetchUsersHandler}>Загрузить ещё</Button>
    </div>
  )
}

export default UsersPage
