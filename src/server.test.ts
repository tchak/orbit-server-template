import type { Server } from 'http';
import supertest from 'supertest';

import { createServer } from './server';

describe('planet', () => {
  let server: Server;
  beforeEach((done) => {
    const { app, source } = createServer();
    server = app.listen(() => done());
    server.on('close', () => source.deactivate());
  });
  afterEach((done) => {
    server.close(() => done());
  });

  describe('empty', () => {
    test('findRecords', async () => {
      const response = await supertest(server).get('/planets');

      expect(response.body).toStrictEqual({ data: [] });
    });

    test('findRecord', async () => {
      const response = await supertest(server).get('/planets/earth');

      expect(response.status).toEqual(404);
    });
  });

  describe('with record', () => {
    let earthId: string;
    beforeEach(async () => {
      const {
        body: { data },
      } = await supertest(server)
        .post('/planets')
        .send({
          data: {
            type: 'planet',
            attributes: {
              name: 'Earth',
            },
          },
        });

      earthId = data.id;
    });

    test('findRecords', async () => {
      const response = await supertest(server).get('/planets');

      expect(response.body).toStrictEqual({
        data: [
          {
            type: 'planet',
            id: earthId,
            attributes: {
              name: 'Earth',
            },
          },
        ],
      });
    });

    test('findRecord', async () => {
      const response = await supertest(server).get(`/planets/${earthId}`);

      expect(response.body).toStrictEqual({
        data: {
          type: 'planet',
          id: earthId,
          attributes: {
            name: 'Earth',
          },
        },
      });
    });
  });
});
