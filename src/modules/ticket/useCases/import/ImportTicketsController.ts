import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportTicketsUseCase } from './ImportTicketsUseCase';

export class ImportTicketsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importTicketsCsvUseCase = container.resolve(ImportTicketsUseCase);

    const responseImported = await importTicketsCsvUseCase.execute(file);

    return response.json(responseImported);
  }
}
