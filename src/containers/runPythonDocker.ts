// import { Docker } from 'dockerode';

// import { TestCases } from '../types/testCases';
import { PYTHON_IMAGE } from '../utils/constants';
import decodeDockerStream from './dockerHelper';
import createContainer from './containerFactory';

async function runPython(code: string, inputTestCase: string) {
  const rawLogBuffer: Buffer[] = [];

  console.log('initializing a new python docker Container..');
  // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
  //   'python3',
  //   '-c',
  //   code,
  //   'stty -echo',
  // ]);
  const safeCode = code.replace(/'/g, `'\\''`);
  const safeTestCases = inputTestCase.replace(/'/g, `'\\''`);
  const runCommand = `echo '${safeCode}' > test.py && echo '${safeTestCases}' | python3 test.py`;

  // let runCommand = `echo \'${code}\' > test.py && echo ${inputTestCase} | python3 test.py`;
  // runCommand = runCommand.replace(/)

  const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['/bin/sh', '-c', runCommand ]);
  // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [`echo -e "x=input()\nprint('value of x is:', x)" > test.py && echo 2 | python3 test.py`

  // starting /booting the docker Container
  await pythonDockerContainer.start();
  console.log('Started the docker Container');

  const loggerStream = await pythonDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true, // Weather the logs are streamed or returned as a string!
  });

  // Attach events on the stream object to start and stop reading
  loggerStream.on('data', (chunk) => {
    rawLogBuffer.push(chunk);
  });

  loggerStream.on('end', () => {
    console.log(rawLogBuffer);
    const completeBuffer = Buffer.concat(rawLogBuffer);
    const decodedStream = decodeDockerStream(completeBuffer);
    console.log(decodedStream);

    console.log(decodedStream.stdout)
  });

  return;
}
export default runPython;
