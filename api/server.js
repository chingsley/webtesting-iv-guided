const express = require('express');

const hobbitsRouter = require('./routes/hobbitsRouter');

const server = express();

server.use(express.json());

server.get('/api', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/', (req, res) =>
  res.status(200).json({ message: "Welcome. Let's begin..." })
);
server.use('/api/hobbits/', hobbitsRouter);
server.use('/*', (req, res) =>
  res.status(404).json({ error: 'endpoint not found' })
);
server.use((err, req, res, next) => {
  const error =
    process.env.ENVIRONMENT === 'development' ? err : 'Internal server error';
  return res.status(500).json({ error });
});
module.exports = server;
