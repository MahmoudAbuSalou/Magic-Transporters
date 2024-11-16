import request from 'supertest';
import { initializeApp } from '../server';
import { Application } from 'express';// Adjust path to your server entry point
let app: Application;

beforeAll(async () => {
  app = await initializeApp();
});

describe('MagicMover Endpoints', () => {
  let createdMoverId: string;

  it('should create a new MagicMover', async () => {
    const res = await request(app)
      .post('/api/magic-movers') // Adjust to your actual route
      .send({ weightLimit: 100 });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Created');
    expect(res.body.data).toHaveProperty('weightLimit', 100);

    createdMoverId = res.body.data._id;
  });

  it('should fetch all MagicMovers', async () => {
    const res = await request(app).get('/api/magic-movers');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(Array.isArray(res.body.data)).toBeTruthy();
  });

  it('should load items into a MagicMover', async () => {
    console.log(createdMoverId);
    
    const resItems = await request(app)
      .get('/api/magic-items/')
      .send();
      const magicItemId = resItems.body.data[0]._id;
      console.log(magicItemId);
    const res = await request(app)
      .post('/api/magic-movers/load')
      .send({ magicMoverId: createdMoverId, itemIds: [magicItemId] });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body.data.items).toHaveLength(1);
    expect(res.body.data.items[0]).toHaveProperty('name', 'item1');
  });

  it('should start a mission for a MagicMover', async () => {
 
    const res = await request(app)
      .post('/api/magic-movers/start-mission')
      .send({ magicMoverId: createdMoverId });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body.data.questState).toEqual('on-mission');
  });

  it('should end a mission for a MagicMover', async () => {
 
    console.log(createdMoverId);
    
    const res = await request(app)
      .post('/api/magic-movers/end-mission')
      .send({ magicMoverId: createdMoverId });


    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(res.body.data.questState).toEqual('resting');
    expect(res.body.data.missionsCompleted).toEqual(1);
  });

  it('should fetch the MagicMover with the most missions completed', async () => {
    const res = await request(app).get('/api/magic-movers/most-completed');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Success');
    expect(Array.isArray(res.body.data)).toBeTruthy();

    const topMover = res.body.data[0];
    expect(topMover).toHaveProperty('_id');
    expect(topMover).toHaveProperty('missionsCompleted');
  });
});
