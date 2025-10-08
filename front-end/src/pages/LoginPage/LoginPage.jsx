import { useState } from 'react'
import styles from './LoginPage.module.css'
import * as authService from '../../service/authService'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const data = await authService.login({ email, password })
      navigate(`/profile/${data.user.id}`)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className={styles.card}>
      <h2>Entrar</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          E-mail
          <input className={styles.input} value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu e-mail" />
        </label>
        <label className={styles.label}>
          Senha
          <input className={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite sua senha" />
        </label>
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.button} type="submit">Entrar</button>
      </form>
    </section>
  )
}
