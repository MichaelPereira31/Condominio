import { Ticket } from '@prisma/client';

import { ICreateTicketDTO } from '../dtos/ICreateTicketDTO';

export interface ITicketRepository {
  findAll(conditions: object): Promise<Ticket[]>;
  findMany(): Promise<Ticket[]>;
  create(params: ICreateTicketDTO): Promise<void>;
  findByName(name: string): Promise<Ticket | null>;
}
