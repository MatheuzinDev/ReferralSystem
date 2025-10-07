import * as userRepo from '../repositories/userRepository.js'
import bcrypt from 'bcrypt'


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
    res.json(user)
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


    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


export const getProfile = async (req, res) => {
  try {
    const user = await userRepo.getUserById(req.params.id)
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
