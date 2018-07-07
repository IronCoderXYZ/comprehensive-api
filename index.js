const hapi = require('hapi');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongoUri);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

const server = hapi.server({
  port: 5000,
  host: 'localhost'
});

const init = (async () => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      return 'Hello World';
    }
  });

  await server.start();
  console.log(`Server up at: ${server.info.uri}`);
})();
