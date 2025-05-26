import Docker from 'dockerode';

async function createContainer(imageName: string, cmdExecutable: string[]) {
  const docker = new Docker();
  const container = await docker.createContainer({
    Image: imageName,
    Cmd: cmdExecutable,
    AttachStdin: true, // For enable input stream
    AttachStderr: true, // For enable output Stream
    AttachStdout: true, // For enable Error stream
    Tty: false,
    OpenStdin: true, // Keep the input stream open even if there is no interaction
  });

  return container;
}

export default createContainer;
