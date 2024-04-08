import { AppRootStateType } from "app/store"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { ErrorMessage, Field, Form, Formik } from "formik"
import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { profileThunks } from "../model/profile.slice"
import s from "./Status.module.css"
import { Button } from "@mui/material"

const Status = () => {
  const userStatus = useSelector((store: AppRootStateType) => store.profile.userStatus)
  const userId = useSelector((store: AppRootStateType) => store.profile.user.userId)
  const authUserId = useSelector((store: AppRootStateType) => store.auth.userData.id)
  const [isStatusChange, setIsStatusChange] = useState(false)
  const isMe = userId === authUserId
  const dispatch = useAppDispatch()
  const formRef = useRef<HTMLFormElement>(null)

  const userStatusFormValidate = (values: any) => {
    const errors = {}
    return errors
  }

  const submitHandler = (
    values: { status: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    dispatch(profileThunks.saveStatus(values.status))
    setSubmitting(false)
    setIsStatusChange(false)
  }

  const openEditStatusForm = () => {
    setIsStatusChange(true)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      setIsStatusChange(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={`${s.wrapper} ${isMe ? s.cursorPointer : ""}`} onDoubleClick={openEditStatusForm}>
      <span>Статус:&nbsp;</span>
      {isStatusChange && isMe ? (
        <Formik initialValues={{ status: userStatus }} validate={userStatusFormValidate} onSubmit={submitHandler}>
          {({ isSubmitting, handleBlur }) => (
            <Form ref={formRef}>
              <Field
                className={`${s.status} ${s.input}`}
                type="text"
                name="status"
                onBlur={handleBlur}
                autoComplete="off"
              />
              <ErrorMessage name="status" component="div" />
              <Button variant="text" type="submit">
                Подтвердить
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <span className={s.status}>{`${userStatus}`}</span>
      )}
    </div>
  )
}

export default React.memo(Status)
