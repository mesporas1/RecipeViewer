/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const debug = require('debug')('app');
const recRouter = require('./routes/recipeRoutes')();

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
// eslint-disable-next-line no-undef
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  // eslint-disable-next-line no-undef
  for (let i = 0; i < numCPUs; i += 1) {
    // eslint-disable-next-line no-undef
    cluster.fork();
  }

  // eslint-disable-next-line no-undef
  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });
} else {
  const app = express();


  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.listen(PORT, () => {
    debug(`Node ${isDev ? 'dev server' : `cluster worker ${process.pid}`}: listening on port ${PORT}`);
  });


  app.use('/recipe', recRouter);


  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });
}
