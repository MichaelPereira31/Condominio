import { inject, injectable } from 'tsyringe';

import { IFindTicketDTO } from '@modules/ticket/dtos/IFindTicketDTO';
import { ITicketRepository } from '@modules/ticket/implementations/ITicketRepository';
import { Ticket } from '@prisma/client';

@injectable()
export class FindByNameAndExternalId {
  constructor(
    @inject('TicketRepository')
    private readonly ticketRepository: ITicketRepository,
  ) {}
  async execute({
    externalId,
    initialValue,
    finalValue,
    name,
  }: IFindTicketDTO): Promise<Ticket[]> {
    const tickets = await this.ticketRepository.findAll({
      nameWithdrawn: { contains: name },
      batchId: externalId,
    });

    if (initialValue && finalValue) {
      const filterTickets = tickets.filter(
        ticket => ticket.value >= initialValue && ticket.value <= finalValue,
      );
      return filterTickets;
    }
    return tickets;
  }
}
