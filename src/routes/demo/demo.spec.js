import supertest from 'supertest-as-promised';
import { app } from '../../app';

const request = supertest.agent(app.listen());

describe('Demo', () => {
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

  describe('POST /demo/body-must-have-foo-with-bar', () => {
    it('should work if the body has foo with bar', () => {
      return request.post('/demo/body-must-have-foo-with-bar')
        .send({
          foo: {
            bar: 'abc',
          },
        })
        .expect(200, 'It works!');
    });

    it('should result in a 400 is foo container is missing', () => {
      return request.post('/demo/body-must-have-foo-with-bar')
        .send({})
        .expect(400, 'Bad request');
    });

    it('should result in a 400 is foo container does not have bar', () => {
      return request.post('/demo/body-must-have-foo-with-bar')
        .send({
          foo: { },
        })
        .expect(400, 'bar is required.');
    });
  });

  describe('GET /demo/error', () => {
    it('should result in 500 app error response', () => {
      return request.get('/demo/error')
        .expect(500, 'App Error (this is intentional)!');
    });
  });

  describe('GET /demo/error-without-message', () => {
    it('should result in 500 app error response', () => {
      return request.get('/demo/error-without-message')
        .expect(500, '');
    });
  });
});
