import { Button, MenuItem, TextField } from "@mui/material"
import { AppRootStateType } from "app/store"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { profileThunks } from "features/profile/model/profile.slice"
import { useFormik } from "formik"
import { useSelector } from "react-redux"
import * as yup from "yup"
import s from "./FormEditProfile.module.css"

export type FormikValues = {
  aboutMe: string
  fullName: string
  lookingForAJob: boolean
  lookingForAJobDescription: string
}
type Props = {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const validationSchema = yup.object().shape({
  aboutMe: yup.string().min(5, "Длина не менее 5 символов").max(50, "Длина не более 50 символов"),
  fullName: yup
    .string()
    .required("Обязательное поле")
    .min(5, "Длина не менее 5 символов")
    .max(25, "Длина не более 25 символов"),
  lookingForAJob: yup.boolean(),
  lookingForAJobDescription: yup.string().min(5, "Длина не менее 5 символов").max(50, "Длина не более 60 символов"),
})

const FormEditProfile = ({ setIsOpenModal }: Props) => {
  const dispatch = useAppDispatch()
  const user = useSelector((store: AppRootStateType) => store.profile.user)

  const formik = useFormik({
    initialValues: {
      aboutMe: user.aboutMe,
      fullName: user.fullName,
      lookingForAJob: user.lookingForAJob,
      lookingForAJobDescription: user.lookingForAJobDescription,
    },
    validationSchema: validationSchema,
    onSubmit: (values: FormikValues) => {
      dispatch(profileThunks.saveChangesProfile(values)).then(() => setIsOpenModal(false))
    },
  })
  return (
    <div className={s.editProfileWrapper}>
      <form onSubmit={formik.handleSubmit} className={s.formEditProfile}>
        <TextField
          fullWidth
          id="aboutMe"
          name="aboutMe"
          label="Обо мне"
          value={formik.values.aboutMe}
          onChange={formik.handleChange}
          className={s.inputContainer}
          size="small"
          onBlur={formik.handleBlur}
          error={formik.touched.aboutMe && Boolean(formik.errors.aboutMe)}
          helperText={formik.touched.aboutMe && formik.errors.aboutMe}
        />
        <TextField
          fullWidth
          id="lookingForAJob"
          name="lookingForAJob"
          select
          label="Статус поиска работы"
          value={formik.values.lookingForAJob}
          onChange={formik.handleChange}
          className={s.inputContainer}
          size="small"
          onBlur={formik.handleBlur}
          error={formik.touched.lookingForAJob && Boolean(formik.errors.lookingForAJob)}
          helperText={formik.touched.lookingForAJob && formik.errors.lookingForAJob}
        >
          <MenuItem value="true">Ищу работу</MenuItem>
          <MenuItem value="false">Не ищу работу</MenuItem>
        </TextField>
        <TextField
          fullWidth
          id="lookingForAJobDescription"
          name="lookingForAJobDescription"
          label="Какую вакансию рассматриваю"
          value={formik.values.lookingForAJobDescription}
          onChange={formik.handleChange}
          className={s.inputContainer}
          size="small"
          onBlur={formik.handleBlur}
          error={formik.touched.lookingForAJobDescription && Boolean(formik.errors.lookingForAJobDescription)}
          helperText={formik.touched.lookingForAJobDescription && formik.errors.lookingForAJobDescription}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Сохранить
        </Button>
      </form>
    </div>
  )
}

export default FormEditProfile
