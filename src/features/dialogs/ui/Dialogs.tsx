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
          {dialogs.length ? (
            <div className={s.dialogsList}>
              {dialogs.map((d) => {
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
          ) : (
            <div className={s.dialogsIsEmpty}>
              <img src="data:image/png;base64,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"></img>
              <span>
                Диалогов пока что нет
              </span>
            </div>
          )}
        </div>
        <Messages dialogsIsEmpty={dialogs.length === 0}/>
      </div>
    </Block>
  )
}

export default Dialogs
