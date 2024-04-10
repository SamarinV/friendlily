import EditIcon from "@mui/icons-material/Edit"
import { IconButton, Tooltip } from "@mui/material"
import { AppRootStateType } from "app/store"
import facebookIcon from "common/assets/socialIcons/icon-facebook.png"
import githubIcon from "common/assets/socialIcons/icon-github.png"
import instagramIcon from "common/assets/socialIcons/icon-instagram.png"
import twitterIcon from "common/assets/socialIcons/icon-twitter.png"
import vkIcon from "common/assets/socialIcons/icon-vk.png"
import websiteIcon from "common/assets/socialIcons/icon-web-site.png"
import youtubeIcon from "common/assets/socialIcons/icon-youtube.png"
import { useState } from "react"
import { useSelector } from "react-redux"
import ModalApp from "../../../../common/components/ModalApp/ModalApp"
import FormEditContacts from "../FormEditContacts/FormEditContacts"
import Contact from "./Contact"

const UserContacts = () => {
  const userContacts = useSelector((store: AppRootStateType) => store.profile.user?.contacts)
  const [isOpenModalContacts, setIsOpenModalContacts] = useState<boolean>(false)

  if (!userContacts) {
    return <></>
  }

  const openModalEditContacts = () => {
    setIsOpenModalContacts(true)
  }
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex" }}>
        <Contact contact={userContacts.facebook} name="facebook" icon={facebookIcon} />
        <Contact contact={userContacts.github} name="github" icon={githubIcon} />
        <Contact contact={userContacts.instagram} name="instagram" icon={instagramIcon} />
        <Contact contact={userContacts.twitter} name="twitter" icon={twitterIcon} />
        <Contact contact={userContacts.vk} name="vk" icon={vkIcon} />
        <Contact contact={userContacts.website} name="website" icon={websiteIcon} />
        <Contact contact={userContacts.youtube} name="youtube" icon={youtubeIcon} />
      </div>
      <Tooltip title="Редактировать контакты" placement="top">
        <IconButton
          onClick={openModalEditContacts}
          sx={{ border: "1px solid grey", width: "33px", height: "33px", marginLeft: "10px" }}
          aria-label="edit"
          color="primary"
          component="label"
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

      <ModalApp isOpenModal={isOpenModalContacts} setIsOpenModal={setIsOpenModalContacts}>
        <FormEditContacts setIsOpenModal={setIsOpenModalContacts} />
      </ModalApp>
    </div>
  )
}

export default UserContacts
