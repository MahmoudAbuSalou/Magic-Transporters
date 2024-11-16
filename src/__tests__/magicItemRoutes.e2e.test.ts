import request from 'supertest';
import { initializeApp } from '../server';
import { Application } from 'express';
let app: Application;

beforeAll(async () => {
  app = await initializeApp();
});

interface MagicItem {
  _id: string;
  name: string;
  weight: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

describe('Magic Item API', () => {
  it('should create a new magic item', async () => {
    const newItem = {
      name: "item5",
      weight: 2,
    };

    const res = await request(app)
      .post('/api/magic-items/')
      .send(newItem);

    expect(res.statusCode).toEqual(201); // Check for created status code
    expect(res.body).toHaveProperty('message', 'Created'); // Check for success message
    expect(res.body).toHaveProperty('data'); // Check for data object

    const createdItem = res.body.data;
    expect(createdItem).toHaveProperty('name', newItem.name); // Check item name
    expect(createdItem).toHaveProperty('weight', newItem.weight); // Check item weight
  });

  it('should fetch a list of magic items', async () => {
    const res = await request(app)
      .get('/api/magic-items/')
      .send();

    expect(res.statusCode).toEqual(200); // Check for successful response
    expect(res.body).toHaveProperty('message', 'Success'); // Check for success message
    expect(res.body).toHaveProperty('data'); // Check for data array

    const items = res.body.data;
    expect(items).toBeInstanceOf(Array); // Ensure data is an array

    // remove comment if i am sure there is data
    // expect(items.length).toBeGreaterThan(0);

    items.forEach((item: MagicItem) => {
      expect(item).toHaveProperty('_id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('weight');
      expect(item).toHaveProperty('createdAt');
      expect(item).toHaveProperty('updatedAt');
    });
  });
});