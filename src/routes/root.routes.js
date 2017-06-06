const koaRouter = require('koa-router');
const { root } = require('./root.controller');

/**
 * Root routes: just return the API name.
 */
const rootRouter = koaRouter()
  .get('/', root);

module.exports = { rootRouter };
