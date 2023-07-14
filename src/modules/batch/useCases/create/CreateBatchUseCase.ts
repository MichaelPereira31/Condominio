import { inject, injectable } from 'tsyringe';

import { ICreateBatchDTO } from '@modules/batch/dtos/ICreateBatchDTO';
import { IBatchRepository } from '@modules/batch/implementations/IBatchRepository';

@injectable()
export class CreateBatchUseCase {
  constructor(
    @inject('BatchRepository')
    private readonly batchRepository: IBatchRepository,
  ) { }
  async execute({ externalId, name }: ICreateBatchDTO): Promise<void> {
    await this.batchRepository.create({ externalId, name });
  }
}
