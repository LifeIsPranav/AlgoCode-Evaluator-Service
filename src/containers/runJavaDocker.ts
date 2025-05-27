// import { Docker } from 'dockerode';

// import { TestCases } from '../types/testCases';
import { JAVA_IMAGE } from '../utils/constants';
import decodeDockerStream from './dockerHelper';
import createContainer from './containerFactory';

async function runJava(code: string, inputTestCase: string) {
  const rawLogBuffer: Buffer[] = [];

  console.log('initializing a new java docker Container..');
  // const javaDockerContainer = await createContainer(JAVA_IMAGE, [
  //   'java3',
  //   '-c',
  //   code,
  //   'stty -echo',
  // ]);
  const safeCode = code.replace(/'/g, `'\\''`);
  const safeTestCases = inputTestCase.replace(/'/g, `'\\''`);
  const runCommand = `echo '${safeCode}' > Main.java && javac Main.java && echo '${safeTestCases}' | java Main`;

  // let runCommand = `echo \'${code}\' > test.py && echo ${inputTestCase} | java3 test.py`;
  // runCommand = runCommand.replace(/)

  const javaDockerContainer = await createContainer(JAVA_IMAGE, ['/bin/sh', '-c', runCommand ]);
  // const javaDockerContainer = await createContainer(JAVA_IMAGE, [`echo -e "x=input()\nprint('value of x is:', x)" > test.py && echo 2 | java3 test.py`

  // starting /booting the docker Container
  await javaDockerContainer.start();
  console.log('Started the java docker Container');

  const loggerStream = await javaDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true, // Weather the logs are streamed or returned as a string!
  });

  // Attach events on the stream object to start and stop reading
  loggerStream.on('data', (chunk) => {
    rawLogBuffer.push(chunk);
  });

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
  await javaDockerContainer.remove();
}
export default runJava;
