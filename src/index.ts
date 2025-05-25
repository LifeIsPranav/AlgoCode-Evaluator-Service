import express, { Express } from 'express';

import sampleWorker from './workers/sampleWorker';
import apiRouter from './routes';
import sampleQueueProducer from './producers/sampleQueueProducer';
import serverConfig from './config/serverConfig';

const app: Express = express();

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
  console.log(`Server Started at Port ${serverConfig.PORT}`);
  sampleWorker('sampleQueue');

  sampleQueueProducer('sampleJob', {
    name: 'Pranav',
    company: 'google',
    position: 'SDE 3',
    location: 'Remote | Patna',
  });
});
