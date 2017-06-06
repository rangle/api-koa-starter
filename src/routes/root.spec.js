const supertest = require('supertest-as-promised');
const { app } = require('../app');

const request = supertest.agent(app.listen());

describe('Root', () => {
  describe('GET /', () => {
    it('should result in API name response', () => {
      return request.get('/')
        .expect(200, 'API Koa Starter from Rangle.io');
    });
  });
});
