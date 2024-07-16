import { EventController } from '@/controllers/event.controller';
import { Router } from 'express';

export class EventRouter {
  private router: Router;
  private eventController: EventController;

  constructor() {
    this.eventController = new EventController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.eventController.getEvents);
    this.router.get('/search', this.eventController.getEventsBySearch);
    this.router.get('/:id', this.eventController.getEventById);
    this.router.post('/', this.eventController.createEvent);
  }

  getRouter(): Router {
    return this.router;
  }
}
