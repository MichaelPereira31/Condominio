/* eslint-disable camelcase */
import csv from 'csv-parser';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { IBatchRepository } from '@modules/batch/implementations/IBatchRepository';
import { ITicketRepository } from '@modules/ticket/implementations/ITicketRepository';
import { AppError } from '@shared/errors/AppError';

interface IReceivedCsv {
  nome: string;
  unidade: string;
  valor: string;
  linha_digitavel: string;
}

@injectable()
export class ImportTicketsUseCase {
  constructor(
    @inject('TicketRepository')
    private readonly ticketRepository: ITicketRepository,
    @inject('BatchRepository')
    private readonly batchRepository: IBatchRepository,
  ) {}
  async execute(file?: Express.Multer.File): Promise<string> {
    if (!file) throw new AppError('error file', 400);
    fs.createReadStream(file.path)
      .pipe(csv({ separator: ';' }))
      .on('data', async data => {
        const { nome, unidade, valor, linha_digitavel }: IReceivedCsv = data;
        const formattingBatchName = unidade.replace(
          /\b(\d{1,3})\b/g,
          (number: string) => number.padStart(4, '0'),
        );

        const batch = await this.batchRepository.findByName(
          formattingBatchName,
        );

        if (!batch) throw new AppError('error batch', 400);

        await this.ticketRepository.create({
          nameWithdrawn: nome,
          batchId: batch.externalId,
          value: Number(valor),
          digitableLine: linha_digitavel,
          active: batch.active,
        });
      })
      .on('end', () => {
        fs.unlinkSync(file.path);
      });
    return 'Boletos importados com sucesso';
  }
}
