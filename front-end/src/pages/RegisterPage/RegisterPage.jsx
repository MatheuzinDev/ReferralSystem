import { useState, useEffect } from 'react'
import styles from './RegisterPage.module.css'
import * as authService from '../../service/authService'
import { useNavigate, useLocation } from 'react-router-dom'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [referralLink, setReferralLink] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    authService.logout()

    const params = new URLSearchParams(location.search)
    const ref = params.get('ref')
    if (ref) setReferralLink(`?ref=${ref}`)
  }, [location.search])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) return setError('O nome é obrigatório.')
    if (!email.includes('@') || !email.includes('.')) return setError('Digite um e-mail válido.')
    if (password.length < 8 || !/\d/.test(password)) return setError('A senha deve ter no mínimo 8 caracteres e conter pelo menos um número.')

    try {
      await authService.register({ name, email, password, referralLink })
      navigate('/login')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Cadastro</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nome
          <input className={styles.input} value={name} onChange={e => setName(e.target.value)} placeholder="Digite seu nome" />
        </label>
        <label className={styles.label}>
          E-mail
          <input className={styles.input} value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu e-mail" />
        </label>
        <label className={styles.label}>
          Senha
          <input className={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite sua senha" />
        </label>
        <input type="hidden" value={referralLink} />
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.button} type="submit">Cadastrar</button>
      </form>
    </section>
  )
}
