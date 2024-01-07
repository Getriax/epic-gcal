"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCalendarAction = void 0;
const app_action_1 = require("../../core/app-action");
class GetCalendarAction extends app_action_1.AppAction {
    method = 'get';
    route = '';
    validators = [];
    async process(request, response) {
        response.json({ hello: 1 });
    }
}
exports.GetCalendarAction = GetCalendarAction;
