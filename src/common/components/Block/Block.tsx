import React from "react"
import s from "./Block.module.css"

type Props = {
  children: React.ReactNode
  withImage?: boolean
}

const Block = ({ children, withImage }: Props) => {
  return (
    <>
      {withImage ? (
        <div className={` ${s.block} ${s.blockWithImage}`}>{children}</div>
      ) : (
        <div className={s.block}>{children}</div>
      )}
    </>
  )
}

export default Block
