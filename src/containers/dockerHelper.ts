import { DOCKER_STREAM_HEADER_SIZE } from '../utils/constants';
import DockerStreamOutput from '../types/dockerStreamOutput';


export default function decodeDockerStream(buffer: Buffer): DockerStreamOutput {
  let offset = 0; // this keeps the track of current position in the buffer while parsing

  // output ojb that will store the accumulated stdout and stderr as strings
  const output: DockerStreamOutput = { stdout: '', stderr: '' };

  // loop until offset reaches end of buffer
  while (offset < buffer.length) {

    // channel now is read from buffer and has value of type of stream
    const typeOfStream = buffer[offset];
    
    // this length variable holds the length of the value
    // we will read this variable on an offset of 4 bytes from start of a chunk
    const length = buffer.readUInt32BE(offset + 4);
    
    // as we have read the header, we can move forward to the value of chunk
    offset += DOCKER_STREAM_HEADER_SIZE;
    
    if (typeOfStream === 1) {
      // stdout stream
      output.stdout += buffer.toString('utf-8', offset, offset + length);
    } else if (typeOfStream === 2) {
      // stderr stream
      output.stderr += buffer.toString('utf-8', offset, offset + length);
    }
    
    offset += length;
  }

  return output;
}
