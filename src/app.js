const Koa = require('koa');
const koaRouter = require('koa-router');
const bodyParser = require('koa-body');
const koaConvert = require('koa-convert');
const helmet = require('koa-helmet');
const { logger } = require('./services/logger');
const { generateRequestId } = require('./middleware/request-id-generator');
const { errorResponder } = require('./middleware/error-responder');
const { k } = require('./project-env');
const { rootRouter } = require('./routes/root.routes');
const { healthCheckRouter } = require('./routes/health-check/health-check.routes');
const { demoRouter } = require('./routes/demo/demo.routes');

const app = new Koa();

// Entry point for all modules.
const api = koaRouter()
  .use('/', rootRouter.routes())
  .use('/health', healthCheckRouter.routes())
  .use('/demo', demoRouter.routes());

/* istanbul ignore if */
if (k.REQUEST_LOGS) {
  const morgan = require('koa-morgan');
  const format = '[RQID=:request-id] - :remote-user' +
    ' [:date[clf]] ":method :url HTTP/:http-version" ' +
    ':status :res[content-length] ":referrer" ":user-agent"';
  morgan.token('request-id', req => req.requestId);
  app.use(morgan(format));
}

app
  .use(helmet())
  .use(koaConvert(bodyParser()))
  .use(generateRequestId)
  .use(errorResponder)
  .use(api.routes())
  .use(api.allowedMethods());

function startFunction() {
  const PORT = process.env.PORT || 3001;
  logger.info(`Starting server on port ${PORT}`);
  app.listen(PORT);
}

/* istanbul ignore if */
if (require.main === module) {
  if (process.env.PROJECT_ENV === 'staging') {
    const throng = require('throng');
    throng(startFunction);
  } else {
    startFunction();
  }
}

module.exports = { app };
