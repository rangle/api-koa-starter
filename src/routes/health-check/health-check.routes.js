const koaRouter = require('koa-router');
const { shallow, deep } = require('./health-check.controller');

/**
 * Health check routes: used by load balancers to determine if traffic should
 * be routed to nodes.
 */
const healthCheckRouter = koaRouter()
  .get('/shallow', shallow)
  .get('/deep', deep);

module.exports = { healthCheckRouter };
