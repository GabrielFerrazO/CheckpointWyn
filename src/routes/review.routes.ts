// src/routes/review.routes.ts
import { Router } from 'express'
import { createReview, getAllReviews } from '../controllers/review.controller'

const router = Router()

router.post('/', createReview)
router.get('/', getAllReviews)

export default router
