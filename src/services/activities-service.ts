import { activitiesRepository } from '@/repositories';

async function getActivitiesByDayIdService(dayId: number, placeId: number) {
  const activities = await activitiesRepository.findActivitiesByDayIdRepository(dayId, placeId);
  return activities;
}

export const activitiesService = {
  getActivitiesByDayIdService,
};
