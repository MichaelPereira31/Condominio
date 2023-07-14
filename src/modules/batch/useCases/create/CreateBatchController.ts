import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateBatchUseCase } from './CreateBatchUseCase';

export class CreateBatchController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { externalId, name } = request.body;
    const createBatchUseCase = container.resolve(CreateBatchUseCase);

    await createBatchUseCase.execute({ externalId, name });

    return response.json({ mensagem: 'Batch adicionado com sucesso' });
  }
}
