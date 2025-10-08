import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './ProfilePage.module.css'

export default function ProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/users/${id}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Erro ao carregar usuário')
        setUser(data)
      } catch (err) {
        setError(err.message)
      }
    }
    fetchUser()
  }, [id])

  const copyReferral = () => {
    if (!user) return
    navigator.clipboard.writeText(`http://localhost:5173/?ref=${user.id}`)
    setShowModal(true)
    setTimeout(() => setShowModal(false), 2500)
  }

  const handleLogout = () => {
    navigate('/login')
  }

  if (error) return <div className={styles.card}>{error}</div>
  if (!user) return <div className={styles.card}>Carregando...</div>

  return (
    <section className={styles.card}>
      <h2>Perfil</h2>
      <div className={styles.info}>
        <p><strong>Nome:</strong> {user.name}</p>
        <p><strong>Pontos:</strong> {user.points}</p>
      </div>

      <div className={styles.referralBox}>
        <label>Seu link de indicação</label>
        <input
          className={styles.referralInput}
          readOnly
          value={`http://localhost:5173/?ref=${user.id}`}
        />
        <button className={styles.referralButton} onClick={copyReferral}>
          Copiar Link
        </button>
      </div>

      <button className={styles.logout} onClick={handleLogout}>
        Sair
      </button>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.checkIcon}>✅</div>
            <h2>Link copiado!</h2>
            <p>O seu link de indicação foi copiado com sucesso 🎉</p>
          </div>
        </div>
      )}
    </section>
  )
}
