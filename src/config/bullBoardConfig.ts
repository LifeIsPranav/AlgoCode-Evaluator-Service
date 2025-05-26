import sampleQueue from '../queues/sampleQueue';

const { ExpressAdapter } = require('@bull-board/express');
const { BullMQAdapter } = require('@bull-board/api/BullMQAdapter');
const { createBullBoard } = require('@bull-board/api');

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/ui');

createBullBoard({
  queues: [new BullMQAdapter(sampleQueue)],
  serverAdapter,
});

export default serverAdapter;
