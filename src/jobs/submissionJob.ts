import { Job } from 'bullmq';

import { IJob } from './../types/bullMqJobDefinition';
import { SubmissionPayload } from '../types/submissionPayload';
import runCpp from '../containers/runCppDocker';

export default class SubmissionJob implements IJob {
  name: string;
  payload: Record<string, SubmissionPayload>;

  constructor(payload: Record<string, unknown>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }

  handle = async (job?: Job) => {
    console.log(`Handler of the Job Called on ${this.payload.name}`);
    console.log();
    if(job){
      const key = Object.keys(this.payload)[0];
      console.log(this.payload[key].language);
      if(this.payload[key].language === 'CPP') {
        const response = await runCpp(this.payload[key].code, this.payload[key].inputCase);
        console.log("Evaluated response is: ", response);
      }
    }
  };

  failed = (job?: Job): void => {
    console.log('Failed Job!');
    if (job) {
      console.log(job.id);
    }
  };
}
