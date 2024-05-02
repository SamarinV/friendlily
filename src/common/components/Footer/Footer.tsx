import s from "./Footer.module.scss"

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <a href="https://t.me/vladimir924" target="_blank" rel="noopener noreferrer">
        © SamarinV
      </a>
      <span>2024</span>
    </footer>
  )
}
