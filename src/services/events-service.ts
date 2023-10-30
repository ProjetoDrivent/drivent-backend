import { Event } from '@prisma/client';
import dayjs from 'dayjs';
import { notFoundError } from '@/errors';
import { eventRepository } from '@/repositories';
import { exclude } from '@/utils/prisma-utils';
import redis, { DEFAULT_EXP } from '@/config/redis';

async function getFirstEvent(): Promise<GetFirstEventResult> {
  const cacheKey = `event`;
  const cachedEvent = await redis.get(cacheKey);

  if (cachedEvent) {
    console.log("Returning event from cache...");
    return JSON.parse(cachedEvent);
  }

  const event = await eventRepository.findFirst();
  if (!event) throw notFoundError();

  const result =  exclude(event, 'createdAt', 'updatedAt');

  redis.setEx(cacheKey, DEFAULT_EXP, JSON.stringify(result));

  return result;
}

export type GetFirstEventResult = Omit<Event, 'createdAt' | 'updatedAt'>;

async function isCurrentEventActive(): Promise<boolean> {
  const event = await eventRepository.findFirst();
  if (!event) return false;

  const now = dayjs();
  const eventStartsAt = dayjs(event.startsAt);
  const eventEndsAt = dayjs(event.endsAt);

  return now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);
}

export const eventsService = {
  getFirstEvent,
  isCurrentEventActive,
};
