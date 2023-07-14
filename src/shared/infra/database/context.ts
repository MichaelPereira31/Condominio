/* eslint-disable @typescript-eslint/naming-convention */
import { PrismaClient } from '@prisma/client';

export type Context = {
  prisma: PrismaClient;
};
