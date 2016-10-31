import koaRouter from 'koa-router';
import { demo, error, errorWithoutMessage } from './demo.controller';
import { validateParams } from '../../middleware/validate-params';

const match = regex => term => regex.test(term);

/**
 * A simple module to demonstrate declarative parameter validation.
 */
export const demoRouter = koaRouter()
  .get(
    '/foo-is-required',
    validateParams(['query'], ['foo']),
    demo)
  .get(
    '/foo-must-be-numeric',
    validateParams(['query'], ['foo'], match(/^[0-9]*$/)),
    demo)
  .post(
    '/body-must-have-foo-with-bar',
    validateParams(['request', 'body', 'foo'], ['bar']),
    demo)
  .get('/error', error)
  .get('/error-without-message', errorWithoutMessage);

