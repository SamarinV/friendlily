import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { Button } from "@mui/material"
import { styled } from "@mui/material/styles"
import { AppRootStateType } from "app/store"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { profileThunks } from "../model/profile.slice"
import s from "./EditPhoto.module.css"

const EditPhoto = () => {
  const image = useSelector<AppRootStateType>((state) => state.profile.user?.photos.large)
	const dispatch = useAppDispatch()
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
			dispatch(profileThunks.savePhoto(e.target.files[0]))
    }
  }

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  })

  return (
    <>
      {image ? (
        <img src={`${image}`} alt="Фото пользователя" />
      ) : (
        <span className={s.mainText}>
          Друзьям будет проще узнать вас, если вы загрузите настоящую фотографию. Вы можете загрузить изображение в
          формате JPG, GIF или PNG.
        </span>
      )}

      <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
        Выбрать файл
        <VisuallyHiddenInput type="file" accept="image/*" onChange={onImageChange} />
      </Button>
    </>
  )
}

export default EditPhoto
