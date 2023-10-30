import faker from '@faker-js/faker';
import dayjs from 'dayjs';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';

import { cleanDb, generateValidToken } from '../helpers';
import { prisma } from '@/config';
import app, { init } from '@/app';
import { createUser } from '../factories';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('GET /enrollments', () => {
  describe('when token is invalid', () => {
    it('should respond with status 401 if no token is given', async () => {
      const response = await server.post('/activities');

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
      const token = faker.lorem.word();

      const response = await server.post('/activities').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
      const userWithoutSession = await createUser();
      const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

      const response = await server.post('/activities').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  });

  describe('when token is valid', () => {
    it('should respond with status 200', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        
    
        const response = await server.post('/activities').set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.OK);
        });
  });
});
