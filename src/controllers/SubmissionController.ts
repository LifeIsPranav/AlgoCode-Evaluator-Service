import { Request, Response } from 'express';

import { createSubmissionDto } from '../dtos/CreateSubmissionDto';

export function addSumbission(req: Request, res: Response) {
  const submissionDto = req.body as createSubmissionDto;
  console.log(submissionDto);

  return res.status(201).json({
    success: true,
    error: {},
    message: 'successfully created Submission',
    data: submissionDto,
  });
}
