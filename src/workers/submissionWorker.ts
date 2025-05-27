import { Job, Worker } from 'bullmq';

import SubmissionJob from '../jobs/submissionJob';
import redisConnection from '../config/redisConfig';

export default function submissionWorker(queueName: string) {
  new Worker(
    queueName,
    async (job: Job) => {
      console.log('Sample job worker Kicking: ');
      if (job.name == 'SubmissionJob') {
        const SubmissionJobInstance = new SubmissionJob(job.data);
        console.log();
        console.log(SubmissionJobInstance.name);
        console.log('----Printing----', job.data.name);
        console.log('---- Job ID ----', job.id);
        console.log();

        try {
          SubmissionJobInstance.handle(job);
        } catch (err) {
          console.log(err);
        }
        return true;
      }
    },
    {
      connection: redisConnection,
    },
  );
}
