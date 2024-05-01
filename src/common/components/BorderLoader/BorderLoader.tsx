import s from "./BorderLoader.module.scss"

type Props = {
  loaderIsVisable: boolean
  children: React.ReactNode
}
const BorderLoader = ({ loaderIsVisable, children }: Props) => {
  if (!loaderIsVisable) {
    return <>{children}</>
  }
  return <div className={s.borderLoader}>{children}</div>
}

export default BorderLoader
