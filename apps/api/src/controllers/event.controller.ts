import { Request, Response } from 'express';
import prisma from '@/utils/db';

export class EventController {
  async getEvents(req: Request, res: Response) {
    try {
      const { page } = req.query;
      const currPage = Number(page) || 1;
      const eventsPerPage = 5;

      const events = await prisma.event.findMany({
        take: eventsPerPage,
        skip: eventsPerPage * (currPage - 1),
        orderBy: {
          date: 'asc',
        },
        select: {
          id: true,
          img: true,
          name: true,
          date: true,
          price: true,
          location: true,
        },
        where: {
          date: {
            gt: new Date(),
          },
        },
      });

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

  async getEventsBySearch(req: Request, res: Response) {
    try {
      const { page, q, cat, location } = req.query;
      const currPage = Number(page) || 1;
      const eventsPerPage = 5;

      const whereConditions = [];

      if (q) {
        whereConditions.push({ name: { contains: String(q) } });
      }

      if (location) {
        whereConditions.push({ location: { contains: String(location) } });
      }

      if (cat) {
        whereConditions.push({ category: { name: String(cat) } });
      }

      whereConditions.push({ date: { gt: new Date() } });

      const events = await prisma.event.findMany({
        take: eventsPerPage,
        skip: eventsPerPage * (currPage - 1),
        orderBy: {
          date: 'asc',
        },
        select: {
          id: true,
          img: true,
          name: true,
          date: true,
          price: true,
          location: true,
        },
        where: whereConditions.length > 0 ? { AND: whereConditions } : {},
      });

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
        where: { id: Number(id), date: { gt: new Date() } },
        include: {
          category: true,
          organizer: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
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
