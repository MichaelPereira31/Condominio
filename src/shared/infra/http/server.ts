import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';

import { getErrors } from '@shared/errors/getErrors';

import { logger } from '../../providers/implementations/repositories/LoggerProvider';
import { routes } from './routes/index';
import '../../containers';

const app = express();

app.use(express.json());
app.use(routes);
app.use(getErrors);

app.listen(3333, () => logger.info('Server is running on port 3333'));
