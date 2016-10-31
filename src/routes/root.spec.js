import supertest from 'supertest-as-promised';
import { app } from '../app';

const request = supertest.agent(app.listen());

describe('Root', () => {
  describe('GET /', () => {
    it('should result in API name response', () => {
      return request.get('/')
        .expect(200, 'API Koa Starter from Rangle.io');
    });
  });
});
