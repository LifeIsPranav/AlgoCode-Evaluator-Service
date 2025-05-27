import SubmissionQueue from '../queues/submissionQueue';

export default async function (payload: Record<string, unknown>) {
  await SubmissionQueue.add("SubmissionJob", payload);
  console.log("Successfully added a new submission Job!");
}
 