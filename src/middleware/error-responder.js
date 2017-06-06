const { logger } = require('../services/logger');

const UNKNOWN_ERROR_CODE = 500;

async function errorResponder(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || UNKNOWN_ERROR_CODE;
    ctx.body = err.message || '';

    logger.error(`${ctx.status} response: ${ctx.body}`, { requestId: ctx.requestId });
    if (ctx.status === UNKNOWN_ERROR_CODE) {
      logger.error(`${err.stack}`, { requestId: ctx.requestId });
    }
  }
}

module.exports = { errorResponder };
