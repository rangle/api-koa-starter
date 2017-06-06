const request = require('request-promise');
const { logger } = require('./logger');

function outgoingRequest({ requestId, url, options }) {
  const method = options && options.method ? options.method : 'GET';

  logger.info(`[OUTGOING ${method} ${url}]: START`, { requestId });
  logger.debug(
    `[OUTGOING ${method} ${url}]: Params:`,
    JSON.stringify(options, null, 2),
    { requestId });

  return request(url, options)
    .then(response => {
      logger.info(`[OUTGOING ${method} ${url}]: OK`, { requestId });
      logger.debug(
        `[OUTGOING ${method} ${url}]: Response:`,
        response,
        { requestId });

      return JSON.parse(response);
    })
    .then(null, err => {
      logger.error(`[OUTGOING ${method} ${url}]: FAILED`, err, { requestId });
      throw err;
    });
}

module.exports = { outgoingRequest };
