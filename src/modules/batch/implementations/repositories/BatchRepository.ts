import { ICreateBatchDTO } from '@modules/batch/dtos/ICreateBatchDTO';
import { Batch } from '@prisma/client';
import prismaClient from '@shared/infra/database';
import { Context } from '@shared/infra/database/context';

import { IBatchRepository } from '../IBatchRepository';

export class BatchRepository implements IBatchRepository {
  constructor(private readonly ctx: Context = { prisma: prismaClient }) {}
  async findByExternalId(id: number): Promise<Batch | null> {
    const batch = await this.ctx.prisma.batch.findUnique({
      where: { externalId: id },
    });

    return batch;
  }

  async findByName(name: string): Promise<Batch | null> {
    const batch = await this.ctx.prisma.batch.findUnique({
      where: { name },
    });

    return batch;
  }

  async create({
    externalId,
    name,
    active = true,
  }: ICreateBatchDTO): Promise<void> {
    await this.ctx.prisma.batch.create({ data: { externalId, name, active } });
  }
}
