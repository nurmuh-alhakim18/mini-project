import { Request, Response } from 'express';
import prisma from '@/utils/db';

export class EventReviewController {
  async getEventReviews(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const reviews = await prisma.review.findMany({
        where: {
          eventId: Number(id),
        },
      });

      return res.status(200).json({
        status: 'success',
        data: reviews,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async createReview(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userId, rating, comment } = req.body;

      const userRole = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          role: true,
        },
      });

      if (userRole?.role.name === 'admin') {
        return res.status(403).json({
          status: 'error',
          message: 'Admin cannot create transaction',
        });
      }

      const transaction = await prisma.transaction.findFirst({
        where: {
          userId: Number(userId),
          eventId: Number(id),
        },
      });

      if (!transaction) {
        return res.status(404).json({
          status: 'error',
          message: 'Transaction not found',
        });
      }

      const newReview = await prisma.review.create({
        data: {
          userId: Number(userId),
          eventId: Number(id),
          rating: Number(rating),
          comment,
        },
      });

      return res.status(201).json({
        status: 'success',
        data: newReview,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}
