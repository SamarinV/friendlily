import { Tooltip } from "@mui/material"
import { useState } from "react"
import s from "./Contact.module.css"

type Props = {
  contact: string | null
  name: string
  icon: string
}

const Contact = ({ contact, name, icon }: Props) => {
  const [open, setOpen] = useState(false)

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = () => {
    setOpen(true)
  }

  const openSocialNetworkHandler = (contact: string | null) => {
    setTimeout(() => {
      handleTooltipClose()
    }, 700)

    if (contact === null) {
      handleTooltipOpen()
    } else {
      window.open(contact, "_blank")
    }
  }

  return (
    <Tooltip
      PopperProps={{
        disablePortal: true,
      }}
      onClose={handleTooltipClose}
      open={open}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      title={`Пользователь не указал ${name}`}
    >
      <button className={s.button} onClick={() => openSocialNetworkHandler(contact)}>
        <img className={s.img} src={icon} alt={`${name}`} />
      </button>
    </Tooltip>
  )
}

export default Contact
