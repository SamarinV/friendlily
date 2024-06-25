import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	IconButton,
	InputAdornment,
	TextField,
	useMediaQuery
} from "@mui/material"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useFormik } from "formik"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import * as yup from "yup"
import { selectorAuthUserId, selectorIsLoggedIn } from "../model/auth.selectors"
import { authThunks } from "../model/auth.slice"
import s from "./Login.module.scss"

const validationSchema = yup.object().shape({
  email: yup.string().email("Некорректный email").required("Введите Email"),
  password: yup.string().required("Введите пароль").min(4, "Длина не менее 4 символов"),
  rememberMe: yup.boolean(),
})

const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector(selectorIsLoggedIn)
  const userId = useSelector(selectorAuthUserId)
  const [showPassword, setShowPassword] = useState(false)
  const isMediumScreen = useMediaQuery("(max-width: 760px)")

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(authThunks.login(values))
    },
  })

  if (isLoggedIn && userId && userId !== 0) {
    return <Navigate to={`/profile/${userId}`} />
  }

  const handleClickShowPassword = () => {
    setShowPassword(true)
  }

  const handleMouseDownPassword = () => {
    setShowPassword(false)
  }

		const loginTestAccount = () => {
			dispatch(authThunks.login({email: 'v.a.samarin@yandex.ru', password: 'test123', rememberMe: false}))
    }

  return (
    <div className={s.login}>
      <div className={s.leftBlock}>
        <p className={s.textAnimation}>Cоциальная сеть для создания позитивных и значимых связей</p>
        <div className={s.wrapScrollingText}>
          <div className={s.scrollingText}>
            <div>
              <p>Общение</p>
            </div>
            <div>
              <p>Друзья</p>
            </div>
            <div>
              <p>Подписки</p>
            </div>
          </div>
        </div>
      </div>

      <div className={s.formWrapper}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl focused={false}>
            <FormLabel>
              <div className={s.formLabel}>
                <p className={s.text}>
                  Зарегистрироваться можно{" "}
                  <a className={s.link} href={"https://social-network.samuraijs.com/signUp"} target={"_blank"}>
                    здесь
                  </a>
                </p>
                <p className={s.text}>
                  или воспользуйтесь <span onClick={loginTestAccount}>тестовым аккаунтом</span>:
                </p>
              </div>
            </FormLabel>
            <FormGroup>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={s.inputContainer}
                size={`${isMediumScreen ? "small" : "medium"}`}
                type="email"
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className={s.inputContainer}
                size={`${isMediumScreen ? "small" : "medium"}`}
                type={showPassword ? "text" : "password"}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                label={"Запомнить меня"}
                control={<Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
              />
              <Button
                type={"submit"}
                variant={"contained"}
                color={"primary"}
                size={`${isMediumScreen ? "small" : "medium"}`}
              >
                Войти
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </div>
    </div>
  )
}

export default Login
