// Include Babel
// setup this project to use babel inline in development mode on the server.
// This means you don’t have to precompile any of the code to have it run on
// the server.
// it will parse all code that comes after it.
// (Not recommended for production use).

process.env.NODE_ENV = 'development';
require('babel-register')({
  ignore: /\/(build|node_modules)\//,
  presets: ['env', 'react-app']
});

require('./server.js');
