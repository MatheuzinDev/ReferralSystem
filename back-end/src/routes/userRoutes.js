import express from 'express'
import * as userController from '../controllers/userController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()


router.post('/register', userController.register)
router.post('/login', userController.login)

router.get('/profile', authenticateToken, userController.getProfile)

export default router
