"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarController = void 0;
const app_controller_1 = require("../core/app-controller");
const get_1 = require("../actions/calendar/get");
class CalendarController extends app_controller_1.AppController {
    path = '/calendar';
    actions = [get_1.GetCalendarAction];
}
exports.CalendarController = CalendarController;
