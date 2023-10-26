import { AuthenticatedRequest } from '@/middlewares';
import { placesService } from '@/services';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getPlaces(req: AuthenticatedRequest, res: Response) {
  const places = await placesService.getPlaces();
  res.status(httpStatus.OK).send(places);
}
