import { getDays } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const dayRouter = Router();

dayRouter.all('/*', authenticateToken).get('/', getDays);

export { dayRouter };
