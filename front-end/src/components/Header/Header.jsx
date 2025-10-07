import styles from './Header.module.css'


export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Referral System - Vortex</h1>
      <nav className={styles.nav}>
        <a className={styles.link} href="/">Cadastro</a>
        <a className={styles.link} href="/login">Entrar</a>
      </nav>
    </header>
  )
}
