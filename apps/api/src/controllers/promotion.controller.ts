import { Request, Response } from 'express';
import prisma from '@/utils/db';

export class PromotionController {
  async getPromotions(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          status: 'error',
          message: 'Event ID is required',
        });
      }

      const eventExists = await prisma.event.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!eventExists) {
        return res.status(404).json({
          status: 'error',
          message: 'Event not found',
        });
      }

      const promotions = await prisma.promotion.findMany({
        where: {
          eventId: Number(id),
        },
      });

      return res.status(200).json({
        status: 'success',
        data: promotions,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async createPromotion(req: Request, res: Response) {
    try {
      const {
        eventId,
        code,
        discountPercentage,
        startDate,
        endDate,
        quantity,
      } = req.body;

      const newPromotion = await prisma.promotion.create({
        data: {
          eventId,
          code,
          discountPercentage,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          quantity,
        },
      });

      return res.status(201).json({
        status: 'success',
        data: newPromotion,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}
