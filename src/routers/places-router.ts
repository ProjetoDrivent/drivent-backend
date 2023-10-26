import { getPlaces } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const placesRouter = Router();

placesRouter.all('/*', authenticateToken).get('/', getPlaces);

export { placesRouter };
