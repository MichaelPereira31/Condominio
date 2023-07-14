import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SplitPdsUseCase } from './SplitPdsUseCase';

export class SplitPdsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importBoletosCsvUseCase = container.resolve(SplitPdsUseCase);

    await importBoletosCsvUseCase.execute(file);

    return response.json({ mensagem: 'PDF salvo com sucesso!' });
  }
}
