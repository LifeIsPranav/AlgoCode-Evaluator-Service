import express, { Express } from 'express';

import sampleWorker from './workers/sampleWorker';
import apiRouter from './routes';
import sampleQueueProducer from './producers/sampleQueueProducer';
import serverConfig from './config/serverConfig';
import serverAdapter from './config/bullBoardConfig';

const app: Express = express();

app.use('/api', apiRouter);
app.use("/ui", serverAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  console.log(`Server Started at Port ${serverConfig.PORT}`);
  sampleWorker('sampleQueue');


  console.log();


  sampleQueueProducer('sampleJob', {
    name: `Pranav`,
    company: 'google',
    position: 'SDE 3',
    location: 'Remote | Patna',
  });

});
