const Koa = require('koa');
const koaBody = require('koa-body');
const routes = require('./routes');
const connectDB = require('./db');
const http = require('http');
const https = require('https');

const port = process.env.PORT || 8000;

async function startServer() {
  try {
    const app = new Koa();
    await connectDB();

    if (process.env.NODE_ENV === 'development') {
      // logger
      app.use(async (ctx, next) => {
        await next();
        const rt = ctx.response.get('X-Response-Time');
        console.log(`${ctx.method} ${ctx.url} - ${rt}`);
      });
      // x-response-time
      app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', `${ms}ms`);
      });
    }

    app.use(koaBody());

    // error handler
    app.use(async (ctx, next) => {
      try {
        await next();
        const status = ctx.status || 404;
        if (status === 404) {
          ctx.throw(404);
        }
      } catch (err) {
        console.log(err);
        ctx.status = err.status || 500;
        if (ctx.status === 404) {
          ctx.body = {
            status: 404,
          };
        } else {
          ctx.body = {
            status: ctx.status,
            error: err,
          };
        }
      }
    });

    // 还没决定是否用view engine 和 static 服务
    // app.use(views(`${__dirname}/views`, { extension: 'jade' }));
    // app.use(static(`${__dirname}/public`));

    // 遍历所有的route
    routes.forEach((route) => {
      app.use(route.routes()).use(route.allowedMethods());
    });

    http
      .createServer(app.callback())
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
