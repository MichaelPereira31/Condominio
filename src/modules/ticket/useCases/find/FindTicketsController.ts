/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAllUseCase } from '../findAll/FindTicketsUseCase';
import { FindByNameAndExternalId } from '../findByNameAndExternalId/FindTicketsUseCase';
import { FindReportUseCase } from '../findReport/FindReportUseCase';

export class FindTicketsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, valor_inicial, valor_final, id_lote, relatorio } =
      request.query;

    let data;

    if (relatorio) {
      const findReportUseCase = container.resolve(FindReportUseCase);
      data = await findReportUseCase.execute(String(relatorio));
    } else if (nome && id_lote) {
      const findByNameAndExternalId = container.resolve(
        FindByNameAndExternalId,
      );

      data = await findByNameAndExternalId.execute({
        name: String(nome),
        initialValue: Number(valor_inicial),
        finalValue: Number(valor_final),
        externalId: Number(id_lote),
      });
    } else {
      const findAllUseCase = container.resolve(FindAllUseCase);
      data = await findAllUseCase.execute();
    }

    return response.json({ data });
  }
}
