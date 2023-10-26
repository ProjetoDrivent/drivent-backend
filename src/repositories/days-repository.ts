import { prisma } from '@/config';

async function getDaysRepository() {
  const days = await prisma.day.findMany();
  return days;
}

export const daysRepository = {
  getDaysRepository,
};
