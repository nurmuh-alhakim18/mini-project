import { TransactionController } from '@/controllers/transaction.controller';
import { Router } from 'express';

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;

  constructor() {
    this.transactionController = new TransactionController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/:id', this.transactionController.getTransactions);
    this.router.get(
      '/:id/:transaction_id',
      this.transactionController.getTransaction,
    );
    this.router.post('/', this.transactionController.createTransaction);
    this.router.post(
      '/apply-promotion',
      this.transactionController.applyPromotion,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
