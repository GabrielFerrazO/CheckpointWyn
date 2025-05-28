import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import userRoutes from './routes/user.routes';
import serviceRoutes from './routes/service.routes';
import reviewRoutes from './routes/review.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Servir HTML e CSS
app.use(express.static(path.join(process.cwd(), 'public')));

// Rotas da API
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/reviews', reviewRoutes);

// Redireciona rota raiz para o HTML
app.get('/', (_, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
