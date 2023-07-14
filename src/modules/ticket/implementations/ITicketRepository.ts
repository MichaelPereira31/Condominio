import { Ticket } from '@prisma/client';

import { ICreateTicketDTO } from '../dtos/ICreateTicketDTO';

export interface ITicketRepository {
  create(params: ICreateTicketDTO): Promise<void>;
  findByName(name: string): Promise<Ticket | null>;
}
