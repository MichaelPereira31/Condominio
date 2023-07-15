import { inject, injectable } from 'tsyringe';

import { ITicketRepository } from '@modules/ticket/implementations/ITicketRepository';
import { Ticket } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class FindAllUseCase {
  constructor(
    @inject('TicketRepository')
    private readonly ticketRepository: ITicketRepository,
  ) {}
  async execute(): Promise<Ticket[]> {
    const tickets = await this.ticketRepository.findMany();

    if (tickets.length === 0) {
      throw new AppError('Não exite boletos cadastrados!');
    }
    return tickets;
  }
}
