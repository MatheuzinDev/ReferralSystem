import { useState, useEffect } from 'react'
import styles from './AuthForm.module.css'
import * as authService from '../../service/authService'
import { useNavigate, useLocation } from 'react-router-dom'

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState('login') 
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

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const data = await authService.login({ email, password })
      navigate(`/profile/${data.user.id}`)
    } catch (err) {
      const message =
        err.response?.data?.message || 'Erro ao realizar login. Tente novamente.'
      setError(message)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) return setError('O nome é obrigatório.')
    if (!email.includes('@') || !email.includes('.'))
      return setError('Digite um e-mail válido.')
    if (password.length < 8 || !/\d/.test(password))
      return setError('A senha deve ter no mínimo 8 caracteres e conter pelo menos um número.')

    try {
      await authService.register({ name, email, password, referralLink })
      setActiveTab('login')
    } catch (err) {
      setError(err.message)
    }
  }

  const resetFields = () => {
    setName('')
    setEmail('')
    setPassword('')
    setError('')
  }

  const switchTab = (tab) => {
    setActiveTab(tab)
    resetFields()
  }

  return (
    <section className={styles.card}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === 'login' ? styles.active : ''}`}
          onClick={() => switchTab('login')}
        >
          Entrar
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'register' ? styles.active : ''}`}
          onClick={() => switchTab('register')}
        >
          Registrar
        </button>
      </div>

      {activeTab === 'login' ? (
        <form className={styles.form} onSubmit={handleLogin}>
          <label className={styles.label}>
            E-mail
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
            />
          </label>

          <label className={styles.label}>
            Senha
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </label>

          {error && <div className={styles.error}>{error}</div>}

          <button className={styles.button} type="submit">
            Entrar
          </button>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleRegister}>
          <label className={styles.label}>
            Nome
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
            />
          </label>

          <label className={styles.label}>
            E-mail
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
            />
          </label>

          <label className={styles.label}>
            Senha
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </label>

          <input type="hidden" value={referralLink} />

          {error && <div className={styles.error}>{error}</div>}

          <button className={styles.button} type="submit">
            Registrar
          </button>
        </form>
      )}
    </section>
  )
}
