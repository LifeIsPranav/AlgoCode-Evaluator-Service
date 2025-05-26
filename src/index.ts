import express, { Express } from 'express';
import bodyParser from 'body-parser';

import sampleWorker from './workers/sampleWorker';
import apiRouter from './routes';
// import sampleQueueProducer from './producers/sampleQueueProducer';
import serverConfig from './config/serverConfig';
import serverAdapter from './config/bullBoardConfig';

const app: Express = express();

app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.text());

app.use('/api', apiRouter);
app.use('/ui', serverAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  console.log(`Server Started at Port ${serverConfig.PORT}`);
  sampleWorker('sampleQueue');

  // console.log();

  // sampleQueueProducer('sampleJob', {
  //   name: `Pranav`,
  //   company: 'google',
  //   position: 'SDE 3',
  //   location: 'Remote | Patna',
  // });
});
