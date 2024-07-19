import { Request, Response } from 'express';
import prisma from '@/utils/db';

export class TransactionController {
  async applyPromotion(req: Request, res: Response) {
    const { eventId, code } = req.body;

    const promotion = await prisma.promotion.findUnique({
      where: {
        eventId,
        code,
        startDate: {
          lte: new Date(),
        },
        endDate: {
          gte: new Date(),
        },
      },
    });

    if (!promotion) {
      return res.status(404).json({
        status: 'error',
        message: 'Promotion not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: promotion,
    });
  }

  async getTransactions(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          status: 'error',
          message: 'User ID is required',
        });
      }

      const userExists = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!userExists) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found',
        });
      }

      const transactions = await prisma.transaction.findMany({
        select: {
          id: true,
          TransactionStatus: {
            select: {
              name: true,
            },
          },
          event: {
            select: {
              name: true,
              date: true,
              location: true,
              img: true,
            },
          },
        },
        where: {
          userId: Number(id),
        },
      });

      return res.status(200).json({
        status: 'success',
        data: transactions,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async getTransaction(req: Request, res: Response) {
    try {
      const { id, transaction_id } = req.params;

      if (!id) {
        return res.status(400).json({
          status: 'error',
          message: 'User ID is required',
        });
      }

      const userExists = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!userExists) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found',
        });
      }

      const transaction = await prisma.transaction.findUnique({
        where: {
          id: Number(transaction_id),
        },
        select: {
          id: true,
          quantity: true,
          totalPrice: true,
          discountPercentage: true,
          discountAmount: true,
          finalPrice: true,
          TransactionStatus: {
            select: {
              name: true,
            },
          },
          event: {
            select: {
              name: true,
              date: true,
              location: true,
              img: true,
            },
          },
        },
      });

      if (!transaction) {
        return res.status(404).json({
          status: 'error',
          message: 'Transaction not found',
        });
      }

      return res.status(200).json({
        status: 'success',
        data: transaction,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async createTransaction(req: Request, res: Response) {
    try {
      const {
        userId,
        eventId,
        quantity,
        totalPrice,
        discountCode,
        discountPercentage,
        discountAmount,
        finalPrice,
      } = req.body;

      const eventDate = await prisma.event.findUnique({
        where: {
          id: eventId,
        },
        select: {
          date: true,
        },
      });

      if (new Date(eventDate?.date ?? '') < new Date()) {
        return res.status(403).json({
          status: 'error',
          message: 'Event has passed',
        });
      }

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

      const [newTransaction] = await prisma.$transaction(async (prisma) => {
        const newTransaction = await prisma.transaction.create({
          data: {
            userId,
            eventId,
            quantity,
            totalPrice,
            discountCode,
            discountPercentage,
            discountAmount,
            finalPrice,
            transactionStatusId: 1,
          },
        });

        const event = await prisma.event.findUnique({
          where: {
            id: eventId,
          },
        });

        if (
          (event?.availableSeats ?? 0) < quantity ||
          (event?.availableSeats ?? 0) === 0
        ) {
          throw new Error('Not enough available seats');
        }

        await prisma.event.update({
          where: {
            id: eventId,
          },
          data: {
            availableSeats: {
              decrement: quantity,
            },
          },
        });

        const discount = await prisma.promotion.findUnique({
          where: {
            code: discountCode,
          },
        });

        if (discount && discount.quantity <= 0) {
          throw new Error("Promotion code can't be used");
        } else {
          await prisma.promotion.update({
            where: {
              code: discountCode,
            },
            data: {
              quantity: {
                decrement: 1,
              },
            },
          });
        }

        return [newTransaction];
      });

      return res.status(201).json({
        status: 'success',
        data: newTransaction,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}
