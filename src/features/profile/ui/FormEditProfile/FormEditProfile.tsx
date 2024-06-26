import { Button, MenuItem, TextField } from "@mui/material"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { selectorProfileUserData } from "features/profile/model/profile.selectors"
import { profileThunks } from "features/profile/model/profile.slice"
import { useFormik } from "formik"
import { useSelector } from "react-redux"
import * as yup from "yup"
import s from "./FormEditProfile.module.scss"

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
  aboutMe: yup.string().required("Обязательное поле").max(50, "Длина не более 50 символов"),
  fullName: yup.string().required("Обязательное поле").max(25, "Длина не более 25 символов"),
  lookingForAJob: yup.boolean(),
  lookingForAJobDescription: yup
    .string()
    .required("Обязательное поле")
    .max(100, "Длина не более 100 символов")
    .nullable(),
})

const FormEditProfile = ({ setIsOpenModal }: Props) => {
  const dispatch = useAppDispatch()
  const user = useSelector(selectorProfileUserData)

  const formik = useFormik({
    initialValues: {
      aboutMe: user.aboutMe,
      fullName: user.fullName,
      lookingForAJob: user.lookingForAJob,
      lookingForAJobDescription: user.lookingForAJobDescription,
    },
    validationSchema: validationSchema,
    onSubmit: (values: FormikValues) => {
      const cleanedValues = {
        ...values,
        aboutMe: values.aboutMe || "",
        lookingForAJobDescription: values.lookingForAJobDescription || "",
      }
      dispatch(profileThunks.saveChangesProfile(cleanedValues)).then(() => setIsOpenModal(false))
    },
  })
  return (
    <div className={s.editProfileWrapper}>
      <form onSubmit={formik.handleSubmit} className={s.formEditProfile}>
        <TextField
          fullWidth
          id="fullName"
          name="fullName"
          label="Мое имя"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          className={s.inputContainer}
          size="small"
          onBlur={formik.handleBlur}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />
        <TextField
          fullWidth
          id="aboutMe"
          name="aboutMe"
          label="Обо мне"
          value={formik.values.aboutMe || ""}
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
