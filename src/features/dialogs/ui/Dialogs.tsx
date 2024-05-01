import { Avatar } from "@mui/material"
import Block from "common/components/Block/Block"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { dialogsThunks } from "../model/dialog.slice"
import { selectorDialogs } from "../model/dialogs.selectors"
import s from "./Dialogs.module.scss"
import Messages from "./Messages/Messages"

const Dialogs = () => {
  const dispatch = useAppDispatch()
  const dialogs = useSelector(selectorDialogs)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(dialogsThunks.getDialogs())
  }, [id])

  const getMessages = (userId: number) => {
    navigate(`/dialogs/${userId}`)
  }

  return (
    <Block>
      <div className={s.wrapper}>
        <div className={s.dialogs}>
          <h2 className={s.title}>Диалоги</h2>
          <div className={s.dialogsList}>
            {dialogs &&
              dialogs.map((d) => {
                return (
                  <div
                    key={d.id}
                    onClick={() => getMessages(d.id)}
                    className={`${s.dialog} ${id && d.id.toString() === id ? s.dialogActive : ""} ${
                      d.hasNewMessages ? s.newMesages : ""
                    }`}
                  >
                    <Avatar src={`${d.photos.small}`} />
                    <span className={s.userName}>{d.userName}</span>
                    {d.hasNewMessages && (
                      <div className={s.newMessages}>
                        <span>{d.newMessagesCount}</span>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADdklEQVR4nO1YW4hNYRT+3G+l3HKdQia8kHJNLklRmsSDKIQkD6JQHk2elDwMHhCllMuUaEx7rX2oEcklnjCElJoMxv06rp/2f/7ztzHnzD5nxtkn7VWrc9qXtdf3/+tf61sLSCSRRBJJJA6hgv+D4n8C0hy3E+2gzaBgGhVNJeBMofqKHmZlzskoCu6XgFPMSwWPmMLYNAgP48zveQyk4nrszmlkvR747DBQ8J6CBeZCHbpTcbIEnGQreoY16Gl8Fsyl4E0ma32nYL25UY1OFOwp4XA6yDp0tkdiNQVfW0q/VdyOjhbpJip+lBCAnxRUGt+IDsH/1upIdRBiNvYWUfExdhCKZnpYaiOmKxVHoxVEwWXWoL950ccUCp7FuBMvKZhhfKlFHyrq8qvsggdModwYOIeRVNyLAchDCkbbBR1BQX1hFEXwgj6m24PVl4qLRQRxhR4G2BCfRMHTtnEtwWcKlliD3ag4VgQQp1iNHjbpLIxyTqOSxiA9b8yWMdpZq1zm9LGOgm//gv2G0/PaqB+JvFiKDYUuVv40XnA6VFXnUfGuzSAEH+ijwrELwYni9COCa47nKMZT0dAGII1MYaLNjv2ouFTsxupmQGfszgzPlRpzLEh98K6jRoqbhfpTKJDbrsYQHULF6kIeNi4E7/xmI4VyCm4VC8gZeujtwiq9qsty0YecNEiw2BRbD5OsjR4UHPl3QNIZaqtbPcEKKj7Z+wG53OIyjmJHFsIZXNvhbCi2hJ4LbK10QxHB5nyyYlQgz+ljjvnADXShYG+W5/a5c+NjJhW1to1uouCs40zp87Avh42uFszsqDwvCpCgayyzhgdHyCrneBZDs46fPAwzz+Te/ctMYYh7XnC1rUAOuVj2MZ2KJxHD8DUFu6iYbGK+Bj0Ni1bspuJtxChodDuYpkb7CwHSHDRWbhUDqqD4Evk8tZeKOSPbQru5PBvvaglIAz1MDVXZw0UHoH8BOk4fvSyYCWZ60gqQi6zFIJtRykpqqiK4mxn9GAYg8FsGIjgQZCQLYr7pzOJ2Xv/St0H7HRqSVGbSN2y/sSpUA7ZZJhq308wxhNgZovoV6XFQZkDnobep2nE7qpEBeY7iKMZkquhoKu7E7pzmDeZxhtqkW0nBm9idKhzMZyrWBEB+xu5MOyjidiABon/sSCKJJJJIIohBfgHLrMP5398xXwAAAABJRU5ErkJggg=="></img>
                      </div>
                    )}
                  </div>
                )
              })}
          </div>
        </div>
        <Messages />
      </div>
    </Block>
  )
}

export default Dialogs
