import { daysRepository } from '@/repositories';

async function getDaysService() {
  const days = await daysRepository.getDaysRepository();
  return days;
}

export const daysService = { getDaysService };
