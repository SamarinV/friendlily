import facebookIcon from "common/assets/socialIcons/icon-facebook.png"
import githubIcon from "common/assets/socialIcons/icon-github.png"
import instagramIcon from "common/assets/socialIcons/icon-instagram.png"
import twitterIcon from "common/assets/socialIcons/icon-twitter.png"
import vkIcon from "common/assets/socialIcons/icon-vk.png"
import websiteIcon from "common/assets/socialIcons/icon-web-site.png"
import youtubeIcon from "common/assets/socialIcons/icon-youtube.png"
import { selectorProfileUserContacts } from "features/profile/model/profile.selectors"
import { useSelector } from "react-redux"
import Contact from "./Contact"
import s from "./userContacts.module.scss"

const UserContacts = () => {
  const userContacts = useSelector(selectorProfileUserContacts)

  if (!userContacts) {
    return <></>
  }

  return (
    <div className={s.contacts}>
      <Contact contact={userContacts.facebook} name="facebook" icon={facebookIcon} />
      <Contact contact={userContacts.github} name="github" icon={githubIcon} />
      <Contact contact={userContacts.instagram} name="instagram" icon={instagramIcon} />
      <Contact contact={userContacts.twitter} name="twitter" icon={twitterIcon} />
      <Contact contact={userContacts.vk} name="vk" icon={vkIcon} />
      <Contact contact={userContacts.website} name="website" icon={websiteIcon} />
      <Contact contact={userContacts.youtube} name="youtube" icon={youtubeIcon} />
    </div>
  )
}

export default UserContacts
