/**
 * Root GET Handler: Just return the API name.
 */
async function root(ctx) {
  ctx.body = 'API Koa Starter from Rangle.io';
}

module.exports = { root };
