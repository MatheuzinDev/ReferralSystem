import * as userRepo from '../repositories/userRepository.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const { name, email, password, referralLink } = req.body
    const existing = await userRepo.getUserByEmail(email)
    if (existing) return res.status(400).json({ message: 'Email já cadastrado.' })

    const hashedPassword = await bcrypt.hash(password, 10)

    let referredBy = null
    if (referralLink) {
      const refId = referralLink.split('=')[1]
      const refUser = await userRepo.getUserById(refId)
      if (refUser) {
        referredBy = refUser.id
        await userRepo.updateUserPoints(refUser.id, refUser.points + 1)
      }
    }

    const user = await userRepo.createUser({ name, email, password: hashedPassword, referredBy })
    res.status(201).json({ message: 'Usuário registrado com sucesso', user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userRepo.getUserByEmail(email)
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(400).json({ message: 'Senha incorreta.' })

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    res.json({
      message: 'Login realizado com sucesso.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        points: user.points
      }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const user = await userRepo.getUserById(userId)
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
