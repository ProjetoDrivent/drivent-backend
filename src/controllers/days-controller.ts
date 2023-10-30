import { AuthenticatedRequest } from '@/middlewares';
import { daysService } from '@/services';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getDays(req: AuthenticatedRequest, res: Response) {
  const days = await daysService.getDaysService();
  res.status(httpStatus.OK).send(days);
}
