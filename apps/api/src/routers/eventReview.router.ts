import { EventReviewController } from '@/controllers/eventReview.controller';
import { Router } from 'express';

export class EventReviewRouter {
  private router: Router;
  private eventReviewController: EventReviewController;

  constructor() {
    this.eventReviewController = new EventReviewController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/:id', this.eventReviewController.getEventReviews);
    this.router.post('/:id', this.eventReviewController.createReview);
  }

  getRouter(): Router {
    return this.router;
  }
}
