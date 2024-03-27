import CloseIcon from "@mui/icons-material/Close"
import { Button, Modal } from "@mui/material"
import s from "./ModalApp.module.css"

type Props = {
  isOpenModal: boolean
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  photoUrl: string
}

const ModalApp = ({ isOpenModal, setIsOpenModal, photoUrl }: Props) => {
  const closeModalHandler = () => {
    setIsOpenModal(false)
  }

  return (
    <Modal
      open={isOpenModal}
      onClose={closeModalHandler}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div className={s.wrapper}>
        <div className={s.closeButton}>
          <Button variant="text" onClick={closeModalHandler} sx={{ padding: "0", minWidth: "0" }}>
            <CloseIcon />
          </Button>
        </div>

        <img className={s.img} src={photoUrl} alt="Фото пользователя" />
      </div>
    </Modal>
  )
}

export default ModalApp
