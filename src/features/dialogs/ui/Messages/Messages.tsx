import { Avatar, Button, CircularProgress, TextField } from "@mui/material"
import { AppRootStateType } from "app/store"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { dialogsThunks } from "features/dialogs/model/dialog.slice"
import { useFormik } from "formik"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import s from "./Messages.module.css"

const Messages = () => {
  const messagesRef = useRef<HTMLDivElement>(null)
  const messages = useSelector((state: AppRootStateType) => state.dialogs.messages)
  const authUser = useSelector((state: AppRootStateType) => state.auth.userData)
  const isLoadingMessages = useSelector((state: AppRootStateType) => state.dialogs.isLoadingMessages)
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const dialogs = useSelector((state: AppRootStateType) => state.dialogs.dialogs)
  const dialog = dialogs.find((d) => d.id === Number(id))
  const navigate = useNavigate()

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
  const openProfileHandler = (userId: number) => {
    navigate(`/profile/${userId}`)
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

  if (!id) {
    return (
      <div className={s.wrapper}>
        <h2 className={s.title}>Выберите диалог</h2>
      </div>
    )
  }

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
                      <span onClick={() => openProfileHandler(m.senderId)} className={s.senderName}>
                        {m.senderName}
                      </span>
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
            label="Напишите сообщение"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
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
