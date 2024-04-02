import { Button, TextField } from "@mui/material"
import { AppRootStateType } from "app/store"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { profileThunks } from "features/profile/model/profile.slice"
import { useFormik } from "formik"
import { useSelector } from "react-redux"
import s from "./FormEditContacts.module.css"
import * as yup from "yup"

export type FormikValuesContacts = {
  facebook: string
  github: string
  instagram: string
  website: string
  vk: string
  twitter: string
  youtube: string
  mainLink: string
}

type Props = {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const validationSchema = yup.object().shape({
  facebook: yup
    .string()
    .url("Ссылка должна быть корректным URL адресом")
    .min(14, "Длина ссылки меньше 14 символов")
    .max(50, "Длина ссылки больше 50 символов"),
  github: yup
    .string()
    .url("Ссылка должна быть корректным URL адресом")
    .min(14, "Длина ссылки меньше 14 символов")
    .max(50, "Длина ссылки больше 50 символов"),
  instagram: yup
    .string()
    .url("Ссылка должна быть корректным URL адресом")
    .min(14, "Длина ссылки меньше 14 символов")
    .max(50, "Длина ссылки больше 50 символов"),
  vk: yup
    .string()
    .url("Ссылка должна быть корректным URL адресом")
    .min(14, "Длина ссылки меньше 14 символов")
    .max(50, "Длина ссылки больше 50 символов"),
  twitter: yup
    .string()
    .url("Ссылка должна быть корректным URL адресом")
    .min(14, "Длина ссылки меньше 14 символов")
    .max(50, "Длина ссылки больше 50 символов"),
  website: yup
    .string()
    .url("Ссылка должна быть корректным URL адресом")
    .min(14, "Длина ссылки меньше 14 символов")
    .max(50, "Длина ссылки больше 50 символов"),
  youtube: yup
    .string()
    .url("Ссылка должна быть корректным URL адресом")
    .min(14, "Длина ссылки меньше 14 символов")
    .max(50, "Длина ссылки больше 50 символов"),
})

const FormEditContacts = ({ setIsOpenModal }: Props) => {
  const dispatch = useAppDispatch()
  const user = useSelector((store: AppRootStateType) => store.profile.user)

  const formik = useFormik({
    initialValues: {
      facebook: user.contacts.facebook,
      github: user.contacts.github,
      instagram: user.contacts.instagram,
      website: user.contacts.website,
      vk: user.contacts.vk,
      twitter: user.contacts.twitter,
      youtube: user.contacts.youtube,
      mainLink: user.contacts.mainLink,
    },
    validationSchema: validationSchema,
    onSubmit: (values: FormikValuesContacts) => {
      dispatch(profileThunks.saveChangesProfile(values)).then(() => setIsOpenModal(false))
    },
  })
  return (
    <div className={s.editProfileWrapper}>
      <form onSubmit={formik.handleSubmit} className={s.formEditProfile}>
        <TextField
          fullWidth
          id="facebook"
          name="facebook"
          label="Facebook"
          value={formik.values.facebook}
          onChange={formik.handleChange}
          className={s.inputContainer}
          onBlur={formik.handleBlur}
          error={formik.touched.facebook && Boolean(formik.errors.facebook)}
          helperText={formik.touched.facebook && formik.errors.facebook}
          size="small"
        />
        <TextField
          fullWidth
          id="github"
          name="github"
          label="Github"
          value={formik.values.github}
          onChange={formik.handleChange}
          className={s.inputContainer}
          onBlur={formik.handleBlur}
          error={formik.touched.github && Boolean(formik.errors.github)}
          helperText={formik.touched.github && formik.errors.github}
          size="small"
        />
        <TextField
          fullWidth
          id="instagram"
          name="instagram"
          label="Instagram"
          value={formik.values.instagram}
          onChange={formik.handleChange}
          className={s.inputContainer}
          onBlur={formik.handleBlur}
          error={formik.touched.instagram && Boolean(formik.errors.instagram)}
          helperText={formik.touched.instagram && formik.errors.instagram}
          size="small"
        />
        <TextField
          fullWidth
          id="vkontakte"
          name="vkontakte"
          label="ВКонтакте"
          value={formik.values.vk}
          onChange={formik.handleChange}
          className={s.inputContainer}
          onBlur={formik.handleBlur}
          error={formik.touched.vk && Boolean(formik.errors.vk)}
          helperText={formik.touched.vk && formik.errors.vk}
          size="small"
        />
        <TextField
          fullWidth
          id="twitter"
          name="twitter"
          label="Twitter"
          value={formik.values.twitter}
          onChange={formik.handleChange}
          className={s.inputContainer}
          onBlur={formik.handleBlur}
          error={formik.touched.twitter && Boolean(formik.errors.twitter)}
          helperText={formik.touched.twitter && formik.errors.twitter}
          size="small"
        />
        <TextField
          fullWidth
          id="website"
          name="website"
          label="Website"
          value={formik.values.website}
          onChange={formik.handleChange}
          className={s.inputContainer}
          onBlur={formik.handleBlur}
          error={formik.touched.website && Boolean(formik.errors.website)}
          helperText={formik.touched.website && formik.errors.website}
          size="small"
        />
        <TextField
          fullWidth
          id="youtube"
          name="youtube"
          label="Youtube"
          value={formik.values.youtube}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`${s.inputContainer} ${s.lastInputContainer}`}
          error={formik.touched.youtube && Boolean(formik.errors.youtube)}
          helperText={formik.touched.youtube && formik.errors.youtube}
          size="small"
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Сохранить
        </Button>
      </form>
    </div>
  )
}

export default FormEditContacts
