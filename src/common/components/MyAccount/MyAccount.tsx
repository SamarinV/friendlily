import { useSelector } from "react-redux"
import Block from "../Block/Block"

import { selectorAuthUserData } from "features/auth/model/auth.selectors"
import image from "../../../common/assets/unnamed.png"
import s from "./MyAccount.module.scss"

const MyAccount = () => {
  const user = useSelector(selectorAuthUserData)
  return (
    <Block>
      <div className={s.block}>
        <img className={s.image} src={image} alt="" />
        <h2 className={s.title}>Данные акаунта</h2>
        <span className={s.userData}>ID пользователя: {user.id}</span>
        <span className={s.userData}>Логин: {user.login}</span>
        <span className={s.userData}>Почта: {user.email}</span>
      </div>
    </Block>
  )
}

export default MyAccount
