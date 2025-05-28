// src/routes/service.routes.ts
import { Router } from 'express';
import { createService, getAllServices } from '../controllers/service.controller';

const router = Router();

router.post('/', createService);
router.get('/', getAllServices);

export default router;
