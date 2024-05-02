import { Avatar, Button, CircularProgress, TextField } from "@mui/material"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { selectorAuthUserData } from "features/auth/model/auth.selectors"
import { dialogsThunks } from "features/dialogs/model/dialog.slice"
import { selectorDialogs, selectorMessages, selectorMessagesIsLoading } from "features/dialogs/model/dialogs.selectors"
import { useFormik } from "formik"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import s from "./Messages.module.scss"

type Props = {
  dialogsIsEmpty: boolean
}

const Messages = ({ dialogsIsEmpty }: Props) => {
  const messagesRef = useRef<HTMLDivElement>(null)
  const messages = useSelector(selectorMessages)
  const authUser = useSelector(selectorAuthUserData)
  const isLoadingMessages = useSelector(selectorMessagesIsLoading)
  const dialogs = useSelector(selectorDialogs)
  const dispatch = useAppDispatch()
  const { id } = useParams()
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

  const messageTime = (value: string) => {
    const date = new Date(value)
    const dateTimeFormat = new Intl.DateTimeFormat("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    return dateTimeFormat.format(date)
  }
  if (dialogsIsEmpty && !isLoadingMessages) {
    return <div className={s.dialogsIsEmpty}></div>
  }

  if (!id) {
    return (
      <div>
        <h2 className={s.title}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABZUlEQVR4nO2YS0oDQRCGe5GtiFkputQ7BDFVIMGFL6oGxiME9DoK7j2BkKpxQDHHiLh27QtXRlFEhUESB5N2ehrqg1rP/1Fd/RjnDMMwjNBAkm26WAGSLrAMXWwg9htIcoSsbx/lYqKV5k0kvfwOH5UAJL0VYLkqho9GoE3ZBrDe/QwfhQCQdJHkeVT4Wgsg9hvAcjgueK0F1rZkDlguysJPUsDyBKQDZMmA5QA5W/IaHnfy5c8P+A8/skhfgfSkzWcL04dPpIOst5WF52LJw1Qne9mwVlFA+oKU7UcrgF9LCkm3I1xCWuiE3GMq83EMMY+RYDl2ddxG/yAwXE97i7U7yFZ3T2eAJEHS6/J5mHCgq7hKtNK8CaQ3v8+CiqvzZQ5I9koEBl4E/us63UnPZ0uW0aOr+4MGPc9Y5U9KrFrA96MeQwn4+q2CIQV8gCYQGLQOBAatA4FB60BgMPYOGIZhGC4E72fbRo/T3zKiAAAAAElFTkSuQmCC"></img>
          Выберите диалог
        </h2>
        <div style={{ position: "relative", height: "100%" }}>
          <div className={s.showThisInCenter}>
            <img src="data:image/png;base64,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"></img>
          </div>
        </div>
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
              const date = messageTime(m.addedAt)

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
                      <span className={s.time}>{date}</span>
                    </div>
                  </div>
                  <div className={s.messageText}>{m.body}</div>
                </div>
              )
            })
          ) : (
            <div className={`${s.showThisInCenter}`}>
              <img src="data:image/png;base64,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"></img>
              <span>Здесь пока нет сообщений</span>
            </div>
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
