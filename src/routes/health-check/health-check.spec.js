const supertest = require('supertest-as-promised');
const { app } = require('../../app');

const request = supertest.agent(app.listen());

describe('Health check', () => {
  describe('GET /health/shallow', () => {
    it('should result in JSON success document', () => {
      return request.get('/health/shallow')
        .expect(200, { healthy: true });
    });
  });

  describe('GET /health/deep', () => {
    it('should result in JSON success document', () => {
      return request.get('/health/deep')
        .expect(200, {
          healthy: true,
          services: {
            arbitraryDataService: { healthy: true },
          },
        });
    });
  });
});
