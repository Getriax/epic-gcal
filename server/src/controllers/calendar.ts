import { AppController } from '../core/app-controller';
import { GetNextEventsAction } from '../actions/calendar/get-next-events';

export class CalendarController extends AppController {
  path = '/calendar';
  actions = [GetNextEventsAction];
}
