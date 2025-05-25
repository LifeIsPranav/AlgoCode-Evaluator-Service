import express, { Express } from 'express';

import apiRouter from './routes';
import serverConfig from './config/serverConfig';

const app: Express = express();

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
  console.log(`Server Started at Port ${serverConfig.PORT}`);
});