import { placesReposity } from '@/repositories/places-repository';

async function getPlaces() {
  const places = await placesReposity.getPlacesRepository();
  return places;
}

export const placesService = {
  getPlaces,
};
