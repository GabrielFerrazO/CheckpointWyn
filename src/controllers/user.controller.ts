import { Request, Response } from 'express'
import prisma from '../config/prisma'
import { userSchema } from '../models/userSchema'
import bcrypt from 'bcryptjs'

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })
    return res.status(200).json(users)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro ao buscar usuários' })
  }
}

export const registerUser = async (req: Request, res: Response) => {
  try {
    const parsed = userSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors })
    }
    const { name, email, password, role } = parsed.data
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(409).json({ error: 'E-mail já cadastrado' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })
    return res.status(201).json(user)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro interno no servidor' })
  }
} 