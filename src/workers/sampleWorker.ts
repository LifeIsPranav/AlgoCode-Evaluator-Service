import { Job, Worker } from 'bullmq';

import SampleJob from '../jobs/SampleJobs';
import redisConnection from '../config/redisConfig';

export default function sampleWorker(queueName: string) {
  new Worker(
    queueName,
    async (job: Job) => {
      console.log("Sample job worker Kicking: ", job);
      if (job.name == 'sampleJob') {
        const sampleJobInstance = new SampleJob(job.data);

        try{

          sampleJobInstance.handle(job);
        }
        catch(err){
          console.log(err)
        }
        return true;
      }
    },
    {
      connection: redisConnection,
    },
  );
}
