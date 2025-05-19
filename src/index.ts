import dotenv from 'dotenv'
dotenv.config() // <-- TEM QUE SER O PRIMEIRO!

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import userRoutes from './routes/user.routes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

app.get('/', (_, res) => {
  res.send('API WYN online')
})

app.use('/api', userRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})
