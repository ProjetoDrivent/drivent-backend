import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getActivitiesByDayId } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter.all('/*', authenticateToken).get('/', getActivitiesByDayId);

export { activitiesRouter };
