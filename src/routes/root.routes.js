import koaRouter from 'koa-router';
import { root } from './root.controller';

/**
 * Root routes: just return the API name.
 */
export const rootRouter = koaRouter()
  .get('/', root);
