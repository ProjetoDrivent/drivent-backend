import app, { close, init } from '@/app';
import faker from '@faker-js/faker';
import supertest from 'supertest';
import { generateValidToken } from '../helpers';
import httpStatus from 'http-status';

beforeAll(async () => {
  await init();
});
afterAll(async () => {
  close();
});

const server = supertest(app);

describe('GET /places', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/places');
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();
    const response = await server.get('/places').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 200', async () => {
    const token = await generateValidToken();
    const response = await server.get('/places').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
  });
});
