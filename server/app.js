const connectDB = require('./db');
const http = require('http');
const https = require('https');

const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const paths = require('../config/paths');
const routes = require('./routes');

const port = process.env.PORT || 8000;

async function startServer() {
  try {
    const app = express();
    await connectDB();

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(paths.appBuild));

    app.use(routes);

    app.use(function (req, res, next) {
      next(createError(404));
    });
    // error handler
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.send(err);
    });

    http
      .createServer(app)
      .listen(port)
      .on('listening', onListening)
      .on('error', onError);
  } catch (error) {
    console.log('server start error');
    process.exit();
  }
}

startServer();

function onListening() {
  console.log(`server is listening on port ${port}`);
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
