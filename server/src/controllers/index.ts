import { CalendarController } from './calendar';
import { AppController } from '../core/app-controller';
import { AuthController } from './auth';

export const controllers: (new () => AppController)[] = [
  CalendarController,
  AuthController,
];
