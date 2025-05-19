// src/controllers/auth.controller.ts
import { Request, Response } from 'express'
import prisma from '../config/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const loginUser = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors })
    }

    const { email, password } = parsed.data

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Senha incorreta' })
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    )

    return res.status(200).json({ token })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro ao fazer login' })
  }
}
