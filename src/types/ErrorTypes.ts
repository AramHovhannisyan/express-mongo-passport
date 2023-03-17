// Error handling
interface ProblemCore {
  code: number
  title: string,
  detail?: string,
}

interface ProblemBody extends ProblemCore {
  instance: string,
}

export interface Err {
  status: number,
  body: ProblemBody,
}

export interface ProblemDefinition extends ProblemCore {
  status: number,
  skipLogging: boolean,
}