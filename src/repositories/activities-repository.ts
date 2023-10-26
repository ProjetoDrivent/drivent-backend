import { prisma } from '@/config';

async function findActivitiesByDayIdRepository(dayId: number, placeId: number) {
  const activities = await prisma.activity.findMany({
    where: { dayId, placeId },
  });
  return activities;
}

export const activitiesRepository = {
  findActivitiesByDayIdRepository,
};
