import { Avatar, Button } from "@mui/material"
import Block from "common/components/Block/Block"
import { UserResponse } from "features/users/api/users-api"
import { NavLink } from "react-router-dom"
import s from "./User.module.scss"

type Props = {
  user: UserResponse
  unFollowHandler: (id: number) => void
  followHandler: (id: number) => void
  openProfileHandler: (id: number) => void
  followInProgress: number[]
  authUserId: number
}

const User = ( props : Props) => {
	const {user, followHandler, unFollowHandler, openProfileHandler, followInProgress, authUserId} = props
  return (
    <Block key={user.id}>
      <div className={s.userWrapper}>
        <div className={s.user}>
          <div className={s.wrapperAvatar} onClick={()=>openProfileHandler(user.id)}>
            <Avatar
              sx={{ height: "60px", width: "60px" }}
              src={user.photos.small ? user.photos.small : ""}
              alt="Фото"
            />
          </div>
          <div className={s.blockNameStatus}>
            <span>{user.name}</span>
            {user.status ? (
              <span className={s.status}>
                {user.status.length > 100 ? `${user.status.substring(0, 100)}...` : user.status}
              </span>
            ) : (
              <span className={s.status}>Статус не указан</span>
            )}
          </div>
        </div>
        {user.id === authUserId ? (
          <Button disabled>Это мой профиль</Button>
        ) : (
          <Button
            onClick={() => {
              user.followed ? unFollowHandler(user.id) : followHandler(user.id)
            }}
            disabled={followInProgress.some((id) => id === user.id)}
          >
            {user.followed ? "Отписаться" : "Подписаться"}
          </Button>
        )}
      </div>
    </Block>
  )
}

export default User
