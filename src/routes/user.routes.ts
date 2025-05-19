// src/routes/user.routes.ts
import express from 'express'
import { getAllUsers } from '../controllers/user.controller'
import { registerUser } from '../controllers/user.controller'

const router = express.Router()

router.post('/register', registerUser)
router.get('/users', getAllUsers)

export default router
