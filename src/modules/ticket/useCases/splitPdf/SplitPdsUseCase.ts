/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import fs from 'fs';
import path from 'path';
import { inject, injectable } from 'tsyringe';

import { ITicketRepository } from '@modules/ticket/implementations/ITicketRepository';
import { AppError } from '@shared/errors/AppError';
import { ReadPDF } from '@shared/utils/readPDF';

@injectable()
export class SplitPdsUseCase {
  constructor(
    @inject('TicketRepository')
    private readonly ticketRepository: ITicketRepository,
  ) { }
  async execute(file?: Express.Multer.File) {
    if (!file) throw new AppError('error file', 400);

    const pathProject = path.resolve(__dirname, '../../../../../');

    const pdf = await ReadPDF(file.path);

    for (const page of pdf) {
      const textPDF = `
      nome: ${page[0]}
      valor: ${page[2]}
      `;

      const ticket = await this.ticketRepository.findByName(page[0]);

      if (!ticket) {
        throw new AppError('error');
      }

      fs.writeFileSync(`${pathProject}/tmp/uploads/${ticket.id}.pdf`, textPDF);
    }
  }
}
