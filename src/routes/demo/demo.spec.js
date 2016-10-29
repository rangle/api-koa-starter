import supertest from 'supertest-as-promised';
import { app } from '../../app';

const request = supertest.agent(app.listen());

describe('Health check', () => {
  describe('GET /demo/foo-is-required', () => {
    it('should work if the parameter is present', () => {
      return request.get('/demo/foo-is-required')
        .query({ foo: 'abc' })
        .expect(200, 'It works!');
    });

    it('should result in a 400 is parameter is missing', () => {
      return request.get('/demo/foo-is-required')
        .expect(400, 'foo is required.');
    });
  });

  describe('GET /demo/foo-must-be-numeric', () => {
    it('should work if the parameter is valid', () => {
      return request.get('/demo/foo-must-be-numeric')
        .query({ foo: 123 })
        .expect(200, 'It works!');
    });

    it('should result in a 400 if the parameter is not numeric', () => {
      return request.get('/demo/foo-must-be-numeric')
        .query({ foo: 'abc' })
        .expect(400, 'foo is invalid.');
    });

    it('should result in a 400 if the parameter mixes numbers with letters', () => {
      return request.get('/demo/foo-must-be-numeric')
        .query({ foo: 'abc123' })
        .expect(400, 'foo is invalid.');
    });

    it('should result in a 400 if the parameter is missing', () => {
      return request.get('/demo/foo-must-be-numeric')
        .expect(400, 'foo is required.');
    });
  });
});
