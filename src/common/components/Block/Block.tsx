import s from "./Block.module.css"
import React from "react"

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
