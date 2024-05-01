import { useAppDispatch } from "common/hooks/useAppDispatch"
import { selectorAuthUserId } from "features/auth/model/auth.selectors"
import { UserResponse } from "features/users/api/users-api"
import { selectorUsersFollowInProgress } from "features/users/model/users.selectors"
import { usersThunks } from "features/users/model/users.slice"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import User from "./User/User"
import s from "./UsersList.module.scss"

type Props = {
  users: UserResponse[]
}

const UsersList = ({ users }: Props) => {
  const authUserId = useSelector(selectorAuthUserId)
  const followInProgress = useSelector(selectorUsersFollowInProgress)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const followHandler = (id: number) => {
    dispatch(usersThunks.followUser(id))
  }

  const unFollowHandler = (id: number) => {
    dispatch(usersThunks.unFollowUser(id))
  }
  const openProfileHandler = (id: number) => {
    navigate(`/profile/${id}`)
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
    <div className={s.usersList}>
      {users &&
        users.map((user) => {
          return (
            <User
              key={user.id}
              user={user}
              followInProgress={followInProgress}
              followHandler={followHandler}
              unFollowHandler={unFollowHandler}
              openProfileHandler={openProfileHandler}
              authUserId={authUserId}
            />
          )
        })}
    </div>
  )
}

export default UsersList
