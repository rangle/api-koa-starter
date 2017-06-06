const { outgoingRequest } = require('./outgoing-request-service');

const ARBITRARY_DATA_SERVICE_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Demonstrates an outgoing request.
async function getArbitraryData({ requestId, path }) {
  const url = `${ARBITRARY_DATA_SERVICE_BASE_URL}/${path}`;

  return await outgoingRequest({ requestId, url });
}

module.exports = { getArbitraryData };
