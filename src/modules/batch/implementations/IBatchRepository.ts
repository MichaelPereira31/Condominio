import { Batch } from '@prisma/client';

import { ICreateBatchDTO } from '../dtos/ICreateBatchDTO';

export interface IBatchRepository {
  findByExternalId(id: number): Promise<Batch | null>;
  findByName(name: string): Promise<Batch | null>;
  create(params: ICreateBatchDTO): Promise<void>;
}
