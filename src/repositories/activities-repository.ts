import { prisma } from '@/config';

async function findActivitiesByDayIdRepository() {
  const activities11 = await prisma.activity.findMany({
    where: { dayId: 1, placeId: 1 },
  });
  const activities12 = await prisma.activity.findMany({
    where: { dayId: 1, placeId: 2 },
  });
  const activities13 = await prisma.activity.findMany({
    where: { dayId: 1, placeId: 3 },
  });
  const activities21 = await prisma.activity.findMany({
    where: { dayId: 2, placeId: 1 },
  });
  const activities22 = await prisma.activity.findMany({
    where: { dayId: 2, placeId: 2 },
  });
  const activities23 = await prisma.activity.findMany({
    where: { dayId: 2, placeId: 3 },
  });
  const activities31 = await prisma.activity.findMany({
    where: { dayId: 3, placeId: 1 },
  });
  const activities32 = await prisma.activity.findMany({
    where: { dayId: 3, placeId: 2 },
  });
  const activities33 = await prisma.activity.findMany({
    where: { dayId: 3, placeId: 3 },
  });

  const activities = {
    day1: {
      place1: activities11,
      place2: activities12,
      place3: activities13,
    },
    day2: {
      place1: activities21,
      place2: activities22,
      place3: activities23,
    },
    day3: {
      place1: activities31,
      place2: activities32,
      place3: activities33,
    },
  };

  return activities;
}

async function findUserActivitiesByUserId(userId: number) {
  const userActivities = await prisma.userActivity.findMany({
    where: { userId },
    include: { Activity: true },
  });
  return userActivities;
}

async function findUserActivityByUserIdAndActivityId(userId: number, activityId: number) {
  const userActivity = await prisma.userActivity.findFirst({
    where: { userId, activityId },
  });
  return userActivity;
}

async function enrollUserInActivity(userId: number, activityId: number) {
  const [activity, userActivity] = await prisma.$transaction([
    prisma.activity.update({
      where: { id: activityId },
      data: { availableSlots: { decrement: 1 } },
    }),
    prisma.userActivity.create({
      data: { userId, activityId },
    }),
  ]);
  return { activity, userActivity };
}

export const activitiesRepository = {
  findActivitiesByDayIdRepository,
  findUserActivitiesByUserId,
  enrollUserInActivity,
  findUserActivityByUserIdAndActivityId,
};
