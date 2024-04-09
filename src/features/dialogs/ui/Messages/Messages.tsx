import { Form, Formik, useFormik } from "formik"
import { Field } from "formik"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { dialogsThunks } from "features/dialogs/model/dialog.slice"
import s from "./Messages.module.css"
import { AppRootStateType } from "app/store"
import { Avatar, Button, CircularProgress, TextField } from "@mui/material"
import LinearLoader from "common/components/LinearLoader/LinearLoader"

const Messages = () => {
  const messagesRef = useRef<HTMLDivElement>(null) // Создаем реф для доступа к контейнеру сообщений
  const messages = useSelector((state: AppRootStateType) => state.dialogs.messages)
  const dialogs = useSelector((state: AppRootStateType) => state.dialogs.dialogs)
  const authUser = useSelector((state: AppRootStateType) => state.auth.userData)
  const isLoadingMessages = useSelector((state: AppRootStateType) => state.dialogs.isLoadingMessages)
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const dialog = dialogs.find((d) => d.id === Number(id))
  useEffect(() => {
    if (id) {
      dispatch(dialogsThunks.getMessages({ userId: Number(id) }))
    }
  }, [id])

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = (userId: number, message: string) => {
    dispatch(dialogsThunks.sendMessage({ userId, message }))
  }

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: (values) => {
      sendMessage(Number(id), values.message)
      formik.resetForm()
    },
  })

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Сообщения</h2>
      <div className={s.messagesAndButton}>
        <div ref={messagesRef} className={s.messages}>
          {isLoadingMessages ? (
            <div className={s.showThisInCenter}>
              <CircularProgress size={100} />
            </div>
          ) : messages.length ? (
            messages.map((m) => {
              return (
                <div className={`${s.message} ${m.senderId === authUser.id ? s.myMessage : ""}`} key={m.id}>
                  <div className={s.messageUserInfo}>
                    {m.senderId === authUser.id ? (
                      authUser.smallPhoto ? (
                        <Avatar src={`${authUser.smallPhoto}`} />
                      ) : (
                        <Avatar />
                      )
                    ) : dialog && dialog.photos.small ? (
                      <Avatar src={`${dialog.photos.small}`} />
                    ) : (
                      <Avatar />
                    )}

                    <div className={s.userNameAndTime}>
                      <span>{m.senderName}</span>
                      <span className={s.time}>{m.addedAt}</span>
                    </div>
                  </div>
                  <div className={s.messageText}>{m.body}</div>
                </div>
              )
            })
          ) : (
            <h2 className={s.showThisInCenter}>Здесь пока нет сообщений</h2>
          )}
        </div>
        <form onSubmit={formik.handleSubmit} className={s.messageForm}>
          <TextField
            fullWidth
            id="message"
            name="message"
            variant="filled"
            size="small"
            value={formik.values.message}
            placeholder="Напишите сообщение"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Button color="primary" variant="contained" type="submit">
            Отправить
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Messages
