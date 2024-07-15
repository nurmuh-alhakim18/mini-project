import { Request, Response } from 'express';
import prisma from '@/prisma';

export class EventController {
  async getEvents(req: Request, res: Response) {
    try {
      const events = await prisma.event.findMany();

      return res.status(200).json({
        status: 'success',
        data: events,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async getEventById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const event = await prisma.event.findUnique({
        where: { id: Number(id) },
      });

      if (!event) {
        return res.status(404).json({
          status: 'error',
          message: 'Event not found',
        });
      }

      return res.status(200).json({
        status: 'success',
        data: event,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  async createEvent(req: Request, res: Response) {
    try {
      const { date, ...datas } = req.body;

      const newEvent = await prisma.event.create({
        data: {
          ...datas,
          date: new Date(date),
        },
      });

      return res.status(201).json({
        status: 'success',
        data: newEvent,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}
