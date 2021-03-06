import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import '@shared/infra/typeorm';
import '@shared/container';
import cors from 'cors';
import { uploadsFolder } from '@config/upload';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import rateLimiter from './middlewares/rateLimiter';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadsFolder));
app.use(rateLimiter);
app.use(routes);
app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => console.log('Listening on 3333'));
