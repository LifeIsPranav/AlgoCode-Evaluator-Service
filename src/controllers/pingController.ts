import { Request, Response } from 'express';

const pingCheck = (_req: Request, res: Response) => {
  // console.log(req.url);
  return res.status(200).json({
    msg: 'Ping Check Okay!',
  });
};

export { pingCheck };
