import { Request, Response, NextFunction } from 'express';

import { logger } from '@shared/providers/implementations/repositories/LoggerProvider';

import { AppError } from './AppError';

export function getErrors(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  logger.error(error.message, {
    err: error,
  });

  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' });
}
