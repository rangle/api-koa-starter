import Koa from 'koa';
import koaRouter from 'koa-router';
import bodyParser from 'koa-body';
import koaConvert from 'koa-convert';
import helmet from 'koa-helmet';
import { logger } from './services/logger';
import { generateRequestId } from './middleware/request-id-generator';
import { errorResponder } from './middleware/error-responder';
import { k } from './project-env';
import { rootRouter } from './routes/root.routes';
import { healthCheckRouter } from './routes/health-check/health-check.routes';
import { demoRouter } from './routes/demo/demo.routes';

function setUpServer(app) {
  // Entry point for all modules.
  const api = koaRouter()
    .get('/', rootRouter.routes())
    .use('/health', healthCheckRouter.routes())
    .use('/demo', demoRouter.routes());

  app.use(generateRequestId);

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
    .use(errorResponder)
    .use(api.routes())
    .use(api.allowedMethods());

  return app;
}

function startFunction() {
  const app = setUpServer(new Koa());
  const PORT = process.env.PORT || 3000;
  logger.info(`Starting server on port ${PORT}`);
  app.listen(PORT);
}
/* istanbul ignore if */
if (require.main === module) {
  const throng = require('throng');
  throng(startFunction);
}

// Top level server configuration.
export const app = setUpServer(new Koa());
