import { Router } from 'express';

import { CreateBatchController } from '@modules/batch/useCases/create/CreateBatchController';
import { FindTicketsController } from '@modules/ticket/useCases/find/FindTicketsController';
import { ImportTicketsController } from '@modules/ticket/useCases/import/ImportTicketsController';
import { SplitPdsController } from '@modules/ticket/useCases/splitPdf/SplitPdsController';

import { upload } from '../middlewares/upload';

export const routes = Router();

const importTicketsController = new ImportTicketsController();
const splitPdsController = new SplitPdsController();
const createBatchController = new CreateBatchController();
const findTicketsController = new FindTicketsController();

routes.get('/boletos/', findTicketsController.handle);
routes.post('/lote', createBatchController.handle);
routes.post('/importar', upload.single('file'), importTicketsController.handle);
routes.post('/pdf', upload.single('file'), splitPdsController.handle);
