import { Role } from '@prisma/client'

declare namespace Express {
  export interface Request {
    user?: {
      userId: string
      role: Role
    }
  }
}
