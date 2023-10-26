import { activitiesRepository } from '@/repositories/activities-repository';

async function getActivitiesByDayIdService(dayId: number) {
  const activities = await activitiesRepository.findActivitiesByDayIdRepository(dayId);
  return activities;
}

export const activitiesService = {
  getActivitiesByDayIdService,
};
