import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useFormik } from "formik"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import * as yup from "yup"
import { selectorAuthUserId, selectorIsLoggedIn } from "../model/auth.selectors"
import { authThunks } from "../model/auth.slice"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import s from "./Login.module.css"
import { useState } from "react"

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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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

  return (
    <div className={s.wrapper}>
      <Grid container justifyContent="center">
        <Grid item xs={16}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl focused={false}>
              <FormLabel>
                <div className={s.formLabel}>
                  <p className={s.text}>
                    Зарегистрироваться можно{" "}
                    <a className={s.link} href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                      здесь
                    </a>
                  </p>
                  <p className={s.text}>или воспользуйтесь тестовым аккаунтом:</p>
                  <p className={s.text}> Email: free@samuraijs.com</p>
                  <p className={s.text}>Password: free</p>
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
                  size="medium"
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
                  size="medium"
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
                  disabled={!(formik.isValid && formik.dirty)}
                  type={"submit"}
                  variant={"contained"}
                  color={"primary"}
                >
                  Войти
                </Button>
              </FormGroup>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}

export default Login
