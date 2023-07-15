/* eslint-disable no-empty-function */
import { ICreateTicketDTO } from '@modules/ticket/dtos/ICreateTicketDTO';
import { Ticket } from '@prisma/client';
import prismaClient from '@shared/infra/database';
import { Context } from '@shared/infra/database/context';

import { ITicketRepository } from '../ITicketRepository';

export class TicketRepository implements ITicketRepository {
  constructor(private readonly ctx: Context = { prisma: prismaClient }) {}
  async findAll(condition: object): Promise<Ticket[]> {
    const ticket = await this.ctx.prisma.ticket.findMany({
      where: condition,
    });
    return ticket;
  }

  async findMany(): Promise<Ticket[]> {
    const ticket = await this.ctx.prisma.ticket.findMany();
    return ticket;
  }

  async findByName(name: string): Promise<Ticket | null> {
    const ticket = await this.ctx.prisma.ticket.findFirst({
      where: { nameWithdrawn: { contains: name } },
    });
    return ticket;
  }

  async create({
    nameWithdrawn,
    batchId,
    value,
    digitableLine,
    active,
  }: ICreateTicketDTO): Promise<void> {
    await this.ctx.prisma.ticket.create({
      data: { nameWithdrawn, batchId, value, digitableLine, active },
    });
  }
}
