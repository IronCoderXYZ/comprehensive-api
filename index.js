const hapi = require('hapi');
const mongoose = require('mongoose');
const config = require('./config');
const Painting = require('./models/Painting');

mongoose.connect(config.mongoUri);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

const server = hapi.server({
  port: 5000,
  host: 'localhost'
});

const init = (async () => {
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        return 'Hello World';
      }
    },
    {
      method: 'GET',
      path: '/api/paintings',
      handler: (request, reply) => {
        return Painting.find();
      }
    },
    {
      method: 'POST',
      path: '/api/paintings',
      handler: (request, reply) => {
        const { name, url, techniques } = request.payload;
        const painting = new Painting({ name, url, techniques });
        return painting.save();
      }
    }
  ]);

  await server.start();
  console.log(`Server up at: ${server.info.uri}`);
})();
