import { AuthenticatedRequest } from '@/middlewares';
import { activitiesService } from '@/services';
import { Response } from 'express';

export async function getActivitiesByDayId(req: AuthenticatedRequest, res: Response) {
  const { dayId, placeId } = req.params;
  const activities = await activitiesService.getActivitiesByDayIdService(Number(dayId), Number(placeId));

  res.status(200).send(activities);
}
