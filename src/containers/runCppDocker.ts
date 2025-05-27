// import { Docker } from 'dockerode';

// import { TestCases } from '../types/testCases';
import { CPP_IMAGE } from '../utils/constants';
import decodeDockerStream from './dockerHelper';
import createContainer from './containerFactory';

async function runCpp(code: string, inputTestCase: string) {
  const rawLogBuffer: Buffer[] = [];

  console.log('initializing a new cpp docker Container..');
  // const cppDockerContainer = await createContainer(CPP_IMAGE, [
  //   'cpp3',
  //   '-c',
  //   code,
  //   'stty -echo',
  // ]);
  const safeCode = code.replace(/'/g, `'\\''`);
  const safeTestCases = inputTestCase.replace(/'/g, `'\\''`);
  const runCommand = `echo '${safeCode}' > main.cpp && g++ main.cpp -o main && echo '${safeTestCases}' | stdbuf -oL -eL ./main`;

  // let runCommand = `echo \'${code}\' > test.py && echo ${inputTestCase} | cpp3 test.py`;
  // runCommand = runCommand.replace(/)

  const cppDockerContainer = await createContainer(CPP_IMAGE, [
    '/bin/sh',
    '-c',
    runCommand,
  ]);
  // const cppDockerContainer = await createContainer(CPP_IMAGE, [`echo -e "x=input()\nprint('value of x is:', x)" > test.py && echo 2 | cpp3 test.py`

  // starting /booting the docker Container
  await cppDockerContainer.start();
  console.log('Started the cpp docker Container');

  const loggerStream = await cppDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true, // Weather the logs are streamed or returned as a string!
  });

  // Attach events on the stream object to start and stop reading
  loggerStream.on('data', (chunk) => {
    rawLogBuffer.push(chunk);
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  await new Promise((res, _rej) => {
    loggerStream.on('end', () => {
      console.log(rawLogBuffer);
      const completeBuffer = Buffer.concat(rawLogBuffer);
      const decodedStream = decodeDockerStream(completeBuffer);
      console.log(decodedStream);

      console.log(decodedStream.stdout);
      res(decodeDockerStream);
    });
  });

  // Remove container when done with it
  await cppDockerContainer.remove();
}
export default runCpp;
