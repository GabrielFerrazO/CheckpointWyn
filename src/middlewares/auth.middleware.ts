import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as { userId: string, role: string }
    req.user = payload
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' })
  }
} 