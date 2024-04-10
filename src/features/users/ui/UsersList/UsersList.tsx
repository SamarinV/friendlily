import { Avatar, Button } from "@mui/material"
import Block from "common/components/Block/Block"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { selectorAuthUserId } from "features/auth/model/auth.selectors"
import { User } from "features/users/api/users-api"
import { selectorUsersFollowInProgress } from "features/users/model/users.selectors"
import { usersThunks } from "features/users/model/users.slice"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import s from "./UsersList.module.css"

type Props = {
  users: User[]
}

const UsersList = ({ users }: Props) => {
  const authUserId = useSelector(selectorAuthUserId)
  const followInProgress = useSelector(selectorUsersFollowInProgress)
  const dispatch = useAppDispatch()

  const followHandler = (id: number) => {
    dispatch(usersThunks.followUser(id))
  }

  const unFollowHandler = (id: number) => {
    dispatch(usersThunks.unFollowUser(id))
  }

  if (users.length === 0) {
    return (
      <div className={s.notFoundBlock}>
        <span className={s.notFoundText}>Пользователи не найдены</span>
        <span className={s.notFoundText}>Попробуйте изменить параметры поиска</span>
      </div>
    )
  }
  return (
    <>
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
                      <span className={s.status}>
                        {u.status.length > 100 ? `${u.status.substring(0, 100)}...` : u.status}
                      </span>
                    ) : (
                      <span className={s.status}>Статус не указан</span>
                    )}
                  </div>
                </div>
                {u.id === authUserId ? (
                  <Button disabled>Это мой профиль</Button>
                ) : (
                  <Button
                    onClick={() => {
                      u.followed ? unFollowHandler(u.id) : followHandler(u.id)
                    }}
                    disabled={followInProgress.some((id) => id === u.id)}
                  >
                    {u.followed ? "Отписаться" : "Подписаться"}
                  </Button>
                )}
              </div>
            </Block>
          )
        })}
    </>
  )
}

export default UsersList
