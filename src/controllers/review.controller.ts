// src/controllers/review.controller.ts
import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { reviewSchema } from '../models/reviewSchema';

export const createReview = async (req: Request, res: Response) => {
  try {
    const data = reviewSchema.parse(req.body);
    const review = await prisma.review.create({ data });
    return res.status(201).json(review);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

export const getAllReviews = async (_req: Request, res: Response) => {
  const reviews = await prisma.review.findMany();
  return res.json(reviews);
};
