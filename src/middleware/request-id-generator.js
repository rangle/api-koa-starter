const uuid = require('uuid');

/**
 * Attaches a unique ID to each incoming request. We can use this when writing
 * logs from downstream middlewares; this way when we're looking at server
 * logs on a real system we can tell what's happening for each one of several
 * multiple, interleaved incoming requests.
 */
async function generateRequestId(ctx, next) {
  const id = uuid.v4();
  ctx.requestId = id;
  ctx.req.requestId = id; // Used by Morgan.
  await next();
}

module.exports = { generateRequestId };
