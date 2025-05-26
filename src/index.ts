import express, { Express } from 'express';
import bodyParser from 'body-parser';

import sampleWorker from './workers/sampleWorker';
import apiRouter from './routes';
// import sampleQueueProducer from './producers/sampleQueueProducer';
import runPython from './containers/runPythonDocker';
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


  const code = `x = input()
y = input()
print(x, y)
`;

  const tc = `40
50
`;
  
  runPython(code, tc);
});
