import { Request, Response } from 'express';
import prisma from '@/utils/db';

export class TransactionController {
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
          discountPrice: true,
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
        discountPrice,
        finalPrice,
      } = req.body;

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

      const newTransaction = await prisma.transaction.create({
        data: {
          userId,
          eventId,
          quantity,
          totalPrice,
          discountPrice,
          finalPrice,
          transactionStatusId: 1,
        },
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
