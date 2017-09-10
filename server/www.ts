import * as http from 'http';
import * as debugModule from 'debug';
import * as mongoose from 'mongoose';

import app from './app';

const debug = debugModule('express-start:server');

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

// create server and listen on provided port (on all network interfaces).
const server = http.createServer(app);

// // socket.io
// const sioModules = require('require-all')({
//   dirname: __dirname + '/socket.io',
//   filter: (filename: string) => {
//     filename = filename.toLowerCase();
//     if ((filename.endsWith('.ts') && !filename.endsWith('.spec.ts'))
//       || (filename.endsWith('.js') && !filename.endsWith('.spec.js'))) {
//       return filename.substr(0, filename.length - 3);
//     }
//   }
// });
// for (const name of Object.keys(sioModules)) {
//   const exported = sioModules[name].default;
//   if (exported && exported.constructor.name === 'Server') {
//     console.log(`Add socket.io server ${name}`);
//     const sioServer = exported as SocketIO.Server;
//     sioServer.attach(server);
//   }
// }

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
// (<any>mongoose).Promise = Promise;

// const MONGODB_CONNECTION = 'mongodb://nikhil1210:mongodb1@ds037817,mlab.com:37817/convux';
// mongoose.connect(MONGODB_CONNECTION, { server: { socketOptions: { keepAlive: 1 } } });
// mongoose.connection.on('error', () => {
//   throw new Error(`unable to connect to database: ${MONGODB_CONNECTION}`);
// });

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: number | string): number | string | boolean {
  const portInt:number =(typeof val === 'string')? parseInt(val, 10) : val;

  if (isNaN(portInt))
    return val;
  
  if (portInt >= 0) 
    return portInt;
  
  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

  debug('Listening on ' + bind);
  console.log('Listening on ' + bind);
}
