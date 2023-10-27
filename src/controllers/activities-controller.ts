import { AuthenticatedRequest } from '@/middlewares';
import { activitiesService } from '@/services';
import { Response } from 'express';

export async function getActivitiesByDayId(req: AuthenticatedRequest, res: Response) {
  const activities = await activitiesService.getActivitiesByDayIdService();

  res.status(200).send(activities);
}
