export const PYTHON_IMAGE = 'python:3.8-slim';
export const JAVA_IMAGE = 'openjdk:11-jdk-slim';
export const CPP_IMAGE = 'gcc:14';

export const submission_queue = 'SubmissionQueue';

// this will represent the header size of docker stream
// docker stream header will contain data about type of stream i.e - stdout/stderr
// and length of header
export const DOCKER_STREAM_HEADER_SIZE = 8;
