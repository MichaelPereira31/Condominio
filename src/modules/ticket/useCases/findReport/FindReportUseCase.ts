/* eslint-disable array-callback-return */
import fs from 'fs';
import path from 'path';
import { inject, injectable } from 'tsyringe';

import { ITicketRepository } from '@modules/ticket/implementations/ITicketRepository';
import { AppError } from '@shared/errors/AppError';
import { FileRemove } from '@shared/utils/fileRemover';

@injectable()
export class FindReportUseCase {
  constructor(
    @inject('TicketRepository')
    private readonly ticketRepository: ITicketRepository,
  ) {}
  async execute(_report: string) {
    const tickets = await this.ticketRepository.findMany();

    if (tickets.length === 0) {
      throw new AppError('Não existe boletos cadastrados');
    }

    const pathProject = path.resolve(__dirname, '../../../../../tmp/uploads');

    let pdf: string = '';
    tickets.map(ticket => {
      pdf += `Nome: ${ticket.nameWithdrawn}, valor: ${ticket.value} \n`;
    });

    fs.writeFileSync(`${pathProject}/report.pdf`, pdf);

    const dataPdf = fs.readFileSync(`${pathProject}/report.pdf`);

    const base64 = dataPdf.toString('base64');

    FileRemove(`${pathProject}/report.pdf`);

    return base64;
  }
}
