import { inject, injectable } from 'tsyringe';

import { ICreateBatchDTO } from '@modules/batch/dtos/ICreateBatchDTO';
import { IBatchRepository } from '@modules/batch/implementations/IBatchRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateBatchUseCase {
  constructor(
    @inject('BatchRepository')
    private readonly batchRepository: IBatchRepository,
  ) {}
  async execute({ externalId, name }: ICreateBatchDTO): Promise<void> {
    const beach = await this.batchRepository.findByName(name);
    if (beach) throw new AppError('Lote já esta criado!');
    await this.batchRepository.create({ externalId, name });
  }
}
