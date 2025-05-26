import express, { Router } from 'express';
const submissionRouter: Router = express.Router();

import { validate } from '../../validators/createSubmissionValidator';
import { createSubmissionZodSchema } from '../../dtos/CreateSubmissionDto';
import { addSumbission } from '../../controllers/SubmissionController';

submissionRouter.post('/', validate(createSubmissionZodSchema), addSumbission);

export default submissionRouter;
