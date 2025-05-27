import express, { Express } from 'express';
import bodyParser from 'body-parser';

import submissionWorker from './workers/submissionWorker';
import sampleWorker from './workers/sampleWorker';
import { submission_queue } from './utils/constants';
import apiRouter from './routes';
// import sampleQueueProducer from './producers/sampleQueueProducer';
// import runPython from './containers/runPythonDocker';
import submissionQueueProducer from './producers/submissionQueueProducer';
import runJava from './containers/runJavaDocker';
import runCpp from './containers/runCppDocker';
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
  // sampleWorker('sampleQueue');

  //   const code = `
  // import java.util.*;
  // public class Main{
  //   public static void main(String[] args){
  //     Scanner sc = new Scanner(System.in);
  //     int input = sc.nextInt();
  //     System.out.println("input given by user: " + input);
  //     for(int i = 0; i < input; i++){
  //       System.out.println(i);
  //     }
  //   }
  // }
  // `;

  const code = `
  #include <iostream>
  using namespace std;

  int main(void){
    int x;
    cin >> x;
    cout <<" value of x is "<< x << endl;

    for(int i = 0; i < x; i++){
      cout << i << " ";
    }

    cout << endl;

    return 0;
  }
  `;

  const tc = `10`;

  // runJava(code, tc);
  // runCpp(code, tc);

  submissionQueueProducer({"1234": {
    language: "CPP",
    code: code,
    inputCase: tc,
  }});


  submissionWorker(submission_queue);
});
