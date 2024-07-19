import { PromotionController } from '@/controllers/promotion.controller';
import { Router } from 'express';

export class PromotionRouter {
  private router: Router;
  private promotionController: PromotionController;

  constructor() {
    this.promotionController = new PromotionController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/:id', this.promotionController.getPromotions);
    this.router.post('/', this.promotionController.createPromotion);
  }

  getRouter(): Router {
    return this.router;
  }
}
