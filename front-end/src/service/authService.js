const API_URL = 'http://localhost:4000/api/users'  // seu backend

export const register = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Erro ao cadastrar')
    return data
  } catch (err) {
    throw err
  }
}

export const login = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Erro ao entrar')
    return data
  } catch (err) {
    throw err
  }
}
