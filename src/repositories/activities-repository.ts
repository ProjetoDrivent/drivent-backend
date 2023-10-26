import { prisma } from '@/config';

async function findActivitiesByDayIdRepository(dayId: number) {
  const activities = await prisma.activity.findMany({
    where: { dayId },
  });
  return activities;
}

export const activitiesRepository = {
  findActivitiesByDayIdRepository,
};
