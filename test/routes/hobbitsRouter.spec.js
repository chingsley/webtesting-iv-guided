const supertest = require('supertest');
const server = require('../../api/server.js');
const db = require('../../data/dbConfig');

describe('hobbitsRouter', () => {
  beforeEach(async () => {
    await db('hobbits').truncate();
  });
  afterAll(async () => {
    await db('hobbits').truncate();
  });

  describe('GET /api/hobbits', () => {
    it('responds with 200 OK', () => {
      return supertest(server).get('/api/hobbits').expect(200);
    });
  });

  describe('POST /api/hobbits', () => {
    it('performs returns 201 for correct hobbit data', async () => {
      const requestBody = { name: 'frodo2' };
      return supertest(server)
        .post('/api/hobbits')
        .send(requestBody)
        .expect(201);
    });
  });

  describe('PUT /api/hobbits/:id', () => {
    it('returns 200 for successful update', async () => {
      const ids = await db('hobbits').insert({ name: 'frodo' });
      return supertest(server)
        .put(`/api/hobbits/${ids[0]}`)
        .send({ name: 'sam' })
        .expect(200);
    });
  });

  describe('GET /api/hobbits/:id', () => {
    it('responds with 200 OK', async () => {
      const ids = await db('hobbits').insert({ name: 'frodo' });
      return supertest(server).get(`/api/hobbits/${ids[0]}`).expect(200);
    });
  });

  describe('DELETE /api/hobbits/:id', () => {
    it('responds with 200 OK for successful delete', async () => {
      const ids = await db('hobbits').insert({ name: 'frodo' });
      return supertest(server).delete(`/api/hobbits/${ids[0]}`).expect(200);
    });
  });
});
