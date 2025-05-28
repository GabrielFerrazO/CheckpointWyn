import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { serviceSchema } from '../models/serviceSchema';

export const createService = async (req: Request, res: Response) => {
  try {
    const { name, description, providerId } = serviceSchema.parse(req.body);

    const service = await prisma.service.create({
      data: {
        name,
        description,
        providerId
      }
    });

    return res.status(201).json(service);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

export const getAllServices = async (_req: Request, res: Response) => {
  const services = await prisma.service.findMany();
  return res.json(services);
};
