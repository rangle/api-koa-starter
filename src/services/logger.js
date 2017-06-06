const winston = require('winston');
const { k } = require('../project-env');

const formatter = options => options.meta && options.meta.requestId ?
  `[RQID=${options.meta.requestId}] ${options.message}` :
  `${options.message}`;

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: k.LOG_LEVEL,
      formatter,
    }),
  ],
});

module.exports = { logger };
