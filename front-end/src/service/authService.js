const API_URL = 'http://localhost:4000/api/users'

export const register = async (userData) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Erro ao cadastrar')

  if (data.token) localStorage.setItem('token', data.token)
  return data
}

export const login = async (userData) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Erro ao entrar')

  localStorage.setItem('token', data.token)
  return data
}

export const getProfile = async () => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('Usuário não autenticado.')

  const res = await fetch(`${API_URL}/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  const data = await res.json()
  if (!res.ok) {
    localStorage.removeItem('token')
    throw new Error(data.message || 'Erro ao buscar perfil')
  }
  return data
}

export const logout = () => {
  localStorage.removeItem('token')
}
