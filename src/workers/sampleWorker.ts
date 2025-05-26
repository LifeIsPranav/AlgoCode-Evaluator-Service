import { Job, Worker } from 'bullmq';

import SampleJob from '../jobs/SampleJobs';
import redisConnection from '../config/redisConfig';

export default function sampleWorker(queueName: string) {
  new Worker(
    queueName,
    async (job: Job) => {
      console.log('Sample job worker Kicking: ');
      if (job.name == 'sampleJob') {
        const sampleJobInstance = new SampleJob(job.data);
        console.log();
        console.log(sampleJobInstance.name);
        console.log('----Printing----', job.data.name);
        console.log('---- Job ID ----', job.id);
        console.log();

        try {
          sampleJobInstance.handle(job);
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
