import { AppRootStateType } from "app/store"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useState } from "react"
import { useSelector } from "react-redux"
import { profileThunks } from "../model/profile.slice"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import React from "react"

const Status = () => {
  // const userStatus = useSelector((store: AppRootStateType) => store.profile.userStatus)
  // const userId = useSelector((store: AppRootStateType) => store.profile.user?.userId)
  // const [isStatusChange, setIsStatusChange] = useState(false)
  // const dispatch = useAppDispatch()

  // const userStatusFormValidate = (values: any) => {
  //   const errors = {}
  //   return errors
  // }

  // const submitHandler = (
  //   values: { status: string },
  //   { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  // ) => {
  //   dispatch(profileThunks.saveStatus(values.status))
  //   setSubmitting(false)
  //   setIsStatusChange(false)
  // }

  // const openEditStatusForm = () => {
  //   setIsStatusChange(true)
  // }

  // useEffect(() => {
  //   console.log("hfdfgcfv")
  //   // dispatch(profileThunks.getStatus(Number(userId)))
  // }, [userStatus])

  // if (!userId) {
  //   return <></>
  // }

  return (
    <div>
      {/* {isStatusChange ? (
        <Formik initialValues={{ status: "" }} validate={userStatusFormValidate} onSubmit={submitHandler}>
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="status" />
              <ErrorMessage name="status" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <span onDoubleClick={openEditStatusForm}>{`${userStatus}`}</span>
      )} */}
    </div>
  )
}

export default React.memo(Status)
