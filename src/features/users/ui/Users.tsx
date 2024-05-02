import { Pagination } from "@mui/material"
import { selectorAppStatus } from "app/appSelectors"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { selectorUsers, selectorUsersCount } from "../model/users.selectors"
import { usersThunks } from "../model/users.slice"
import s from "./Users.module.scss"
import UsersList from "./UsersList/UsersList"
import { Tabs } from "common/components/tabs"

const UsersPage = () => {
  const users = useSelector(selectorUsers)
  const usersCount = useSelector(selectorUsersCount)
  const appStatus = useSelector(selectorAppStatus)
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams({
    count: "10",
    page: "1",
    friend: "false",
    term: "",
  })
  const page = searchParams.get("page")
  const count = searchParams.get("count")
  const friend = searchParams.get("friend")
  const term = searchParams.get("term")
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (page && count && friend) {
      dispatch(usersThunks.fetchUsers({ count, page, friend, term }))
    }
  }, [searchParams])

  const changePageUserHandler = (newPage: number) => {
    setSearchParams({ count: `${count}`, page: `${newPage}`, friend: `${friend}`, term: `${term}` })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const findUserFormValidate = (values: { text: string }) => {
    const errors = {}
    return errors
  }

  const submitHandler = (values: { text: string }) => {
    setSearchParams({ count: `${count}`, page: `1`, friend: `${friend}`, term: values.text })
  }

  const inputOnBlurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    submitHandler({ text: e.currentTarget.value })
  }

  if (appStatus === "loading" && users.length === 0) {
    return <></>
  }

  return (
    <div className={s.usersWrapper}>
      <div className={s.filter}>
        <Tabs friend={friend} />
        <Formik
          initialValues={{ text: `${term !== null ? term : ""}` }}
          validate={findUserFormValidate}
          onSubmit={submitHandler}
        >
          {() => (
            <Form ref={formRef}>
              <Field
                className={`${s.input}`}
                type="text"
                name="text"
                onBlur={inputOnBlurHandler}
                autoComplete="off"
                placeholder="Поиск по имени"
                maxLength={20}
              />
              <ErrorMessage name="text" component="div" />
            </Form>
          )}
        </Formik>
      </div>

      <UsersList users={users} />

      {usersCount > 10 && (
        <Pagination
          onChange={(event, page) => changePageUserHandler(page)}
          count={Math.ceil(usersCount / Number(count))}
          page={Number(page)}
          defaultPage={Number(page)}
          boundaryCount={2}
          color="primary"
          className={s.pagination}
        />
      )}
    </div>
  )
}

export default UsersPage
