import { prisma } from '@/config';

async function getPlacesRepository() {
  const places = await prisma.place.findMany();
  return places;
}

export const placesReposity = {
  getPlacesRepository,
};
