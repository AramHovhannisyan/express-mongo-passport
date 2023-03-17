import problems from './problems.json';
import { Request } from 'express';
import { Err, ProblemDefinition } from './../types/ErrorTypes';

const problem = (code: number, req: Request): Err => {
  const instance = req.path;
  const problemDefinition = problems.find(el => el.code === code) as ProblemDefinition;

  if (problemDefinition) {
    const { status, title, detail, skipLogging } = problemDefinition;

    const err: Err = {
      status,
      body: {
        code,
        title,
        instance,
      },
    };

    if (detail) err.body.detail = detail;

    if (!skipLogging) console.error(err, new Error());
    return err;
  }
  return problem(10001, req);
};

export default problem;
