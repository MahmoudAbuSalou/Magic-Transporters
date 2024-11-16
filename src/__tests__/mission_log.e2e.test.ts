import request from 'supertest';
import { initializeApp } from '../server';
import { Application } from 'express';
let app: Application;

beforeAll(async () => {
  app = await initializeApp();
});
describe('Mission Log API E2E Tests', () => {
  it('should fetch mission logs successfully', async () => {
    const res = await request(app).get('/api/mission-log');

    // Validate the response structure
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);

    // Validate a single mission log object
    if (res.body.data.length > 0) {
      const log = res.body.data[0];
      expect(log).toHaveProperty('_id');
      expect(log).toHaveProperty('magicMoverId');
      expect(log).toHaveProperty('action');
      expect(log).toHaveProperty('createdAt');
      expect(log).toHaveProperty('updatedAt');
    
    }
  });
});
