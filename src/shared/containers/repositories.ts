import { container } from 'tsyringe';

import { IBatchRepository } from '@modules/batch/implementations/IBatchRepository';
import { BatchRepository } from '@modules/batch/implementations/repositories/BatchRepository';
import { ITicketRepository } from '@modules/ticket/implementations/ITicketRepository';
import { TicketRepository } from '@modules/ticket/implementations/repositories/TicketRepository';

container.registerSingleton<ITicketRepository>(
  'TicketRepository',
  TicketRepository,
);

container.registerSingleton<IBatchRepository>(
  'BatchRepository',
  BatchRepository,
);
