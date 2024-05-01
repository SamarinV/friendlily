import CloseIcon from "@mui/icons-material/Close"
import { Button, Modal } from "@mui/material"
import s from "./ModalApp.module.scss"

type Props = {
  isOpenModal: boolean
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

const ModalApp = ({ isOpenModal, setIsOpenModal, children }: Props) => {
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
        {children}
      </div>
    </Modal>
  )
}

export default ModalApp
