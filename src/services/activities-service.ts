import { activitiesRepository } from '@/repositories';

async function getActivitiesByDayIdService() {
  const activities = await activitiesRepository.findActivitiesByDayIdRepository();
  return activities;
}

export const activitiesService = {
  getActivitiesByDayIdService,
};
