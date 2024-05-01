import { Avatar } from "@mui/material"
import Block from "common/components/Block/Block"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { dialogsThunks } from "../model/dialog.slice"
import { selectorDialogs } from "../model/dialogs.selectors"
import s from "./Dialogs.module.scss"
import Messages from "./Messages/Messages"

const Dialogs = () => {
  const dispatch = useAppDispatch()
  const dialogs = useSelector(selectorDialogs)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(dialogsThunks.getDialogs())
  }, [id])

  const getMessages = (userId: number) => {
    navigate(`/dialogs/${userId}`)
  }

  return (
    <Block>
      <div className={s.wrapper}>
        <div className={s.dialogs}>
          <h2 className={s.title}>Диалоги</h2>
          <div className={s.dialogsList}>
            {dialogs &&
              dialogs.map((d) => {
                return (
                  <div
                    key={d.id}
                    onClick={() => getMessages(d.id)}
                    className={`${s.dialog} ${id && d.id.toString() === id ? s.dialogActive : ""}`}
                  >
                    <Avatar src={`${d.photos.small}`} />
                    <span className={s.userName}>{d.userName}</span>
                  </div>
                )
              })}
          </div>
        </div>
        <Messages />
      </div>
    </Block>
  )
}

export default Dialogs
