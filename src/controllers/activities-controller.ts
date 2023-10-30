import { AuthenticatedRequest } from '@/middlewares';
import { activitiesService } from '@/services';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getActivitiesByDayId(req: AuthenticatedRequest, res: Response) {
  const activities = await activitiesService.getActivitiesByDayIdService();
  res.status(200).send(activities);
}

export async function enrollUserInActivity(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { activityId } = req.params;
  const { activityStartTime, activityEndTime, day } = req.body;
  const userActivity = await activitiesService.enllorUserInActivity(
    userId,
    Number(activityId),
    activityStartTime,
    activityEndTime,
    Number(day)
  );
  return res.status(httpStatus.OK).send(userActivity);
}

export async function getUserActivitiesByUserId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const userActivities = await activitiesService.getUserActivitiesByUserId(userId);
  return res.status(httpStatus.OK).send(userActivities);
}