import { Tooltip } from "@mui/material"
import s from "./Contact.module.css"

type Props = {
  contact: string | null
  name: string
  icon: string
}

const Contact = ({ contact, name, icon }: Props) => {
  const openSocialNetworkHandler = (contact: string | null) => {
    if (!contact) {
      return
    } else {
      let url = contact
      if (!url.startsWith("https://")) {
        url = "https://" + url
      }
      window.open(url, "_blank")
    }
  }

  return (
    <Tooltip
      title={contact ? `Открыть ${contact}` : `Пользователь не указал ${name}`}
    >
      <button className={s.button} onClick={() => openSocialNetworkHandler(contact)}>
        <img className={s.img} src={icon} alt={`${name}`} />
      </button>
    </Tooltip>
  )
}

export default Contact
