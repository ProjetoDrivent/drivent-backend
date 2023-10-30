import { cannotEnrollInNewActivity } from '@/errors/cannot-enroll-in-new-activity';
import { activitiesRepository } from '@/repositories';
import dayjs from 'dayjs';

async function getActivitiesByDayIdService() {
  const activities = await activitiesRepository.findActivitiesByDayIdRepository();
  return activities;
}

async function enllorUserInActivity(
  userId: number,
  activityId: number,
  activityStartTime: Date,
  activityEndTime: Date,
  day: number
) {
  const userActivities = await activitiesRepository.findUserActivitiesByUserId(userId);
  const userActivitiesInSameTime = userActivities.filter((userActivity) => {
    const activity = userActivity.Activity;
    const sameDay = day === activity.dayId;
    if (!sameDay) {
      return false;
    }
    const startBefore: boolean = dayjs(activityStartTime).isBefore(activity.startTime);
    const startAfter: boolean = dayjs(activityStartTime).isAfter(activity.endTime) || dayjs(activityStartTime).isSame(activity.endTime);
    const endBefore: boolean = dayjs(activityEndTime).isBefore(activity.startTime) || dayjs(activityEndTime).isSame(activity.startTime);
    return !(
      (startBefore && endBefore) || startAfter
    );
  });
  if (userActivitiesInSameTime.length > 0) {
    throw cannotEnrollInNewActivity();
  }
  const { userActivity } = await activitiesRepository.enrollUserInActivity(userId, activityId);
  return userActivity;
}

async function getUserActivitiesByUserId(userId: number) {
  const userActivities = await activitiesRepository.findUserActivitiesByUserId(userId);
  const userActivitiesIds = userActivities.map((userActivity) => userActivity.activityId);
  return userActivitiesIds;
}

export const activitiesService = {
  getActivitiesByDayIdService,
  enllorUserInActivity,
  getUserActivitiesByUserId,
};
