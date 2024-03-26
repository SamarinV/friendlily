import CloseIcon from "@mui/icons-material/Close"
import { Button, Modal } from "@mui/material"
import s from "./ModalApp.module.css"

type Props = {
  isOpenModal: boolean
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
	modalHeaderText: string
  children: React.ReactNode
}

const ModalApp = ({ isOpenModal, setIsOpenModal, modalHeaderText, children }: Props) => {
  const closeModalHandler = () => {
    setIsOpenModal(false)
  }

  return (
    <Modal
      open={isOpenModal}
      onClose={closeModalHandler}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
			
      <div className={s.openModal}>
        <div className={s.modalHeader}>
          <div>{modalHeaderText}</div>
          <Button variant="text" onClick={closeModalHandler} sx={{ padding: "0", minWidth: "0" }}>
            <CloseIcon />
          </Button>
        </div>
        <div className={s.modalContent}>
					{children}
        </div>

      </div>

    </Modal>
  )
}

export default ModalApp
