import { Button } from "@mui/material"
import { ChangeEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StateType } from "common/types/types"
import { addPost } from "features/profile/model/posts.slice"
import s from "./InputPost.module.css"

const InputPost = () => {
  const [inputValue, setInputValue] = useState("")
  const user = useSelector((store: StateType) => store.user)
  const dispatch = useDispatch()

  const onChangeCallback = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  const sendPostHandler = () => {
    dispatch(
      addPost({
        text: inputValue,
        name: user.name,
        userAvatar: user.avatar,
      })
    )
    setInputValue("")
  }
  return (
    <>
      <input className={s.input} type="text" value={inputValue} onChange={onChangeCallback} placeholder="Текст поста" />
      <Button size="small" variant="contained" onClick={sendPostHandler}>
        Отправить
      </Button>
    </>
  )
}

export default InputPost
