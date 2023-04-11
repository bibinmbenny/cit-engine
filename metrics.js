const prometheus = require('prom-client');

const httpRequestCounter = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests to the server',
  labelNames: ['method', 'endpoint'],
});

module.exports = {
  httpRequestCounter,
};