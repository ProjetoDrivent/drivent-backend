import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getActivitiesByDayId, enrollUserInActivity, getUserActivitiesByUserId } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter
    .all('/*', authenticateToken)
    .get('/', getActivitiesByDayId)
    .post('/:activityId/enroll', enrollUserInActivity)
    .get('/user', getUserActivitiesByUserId);

export { activitiesRouter };
