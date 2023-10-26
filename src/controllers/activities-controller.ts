import { AuthenticatedRequest } from '@/middlewares';
import { activitiesService } from '@/services/activities-service';
import { Response } from 'express';

export async function getActivitiesByDayId(req: AuthenticatedRequest, res: Response) {
  const { dayId } = req.params;
  const activities = await activitiesService.getActivitiesByDayIdService(Number(dayId));

  res.status(200).send(activities);
}
