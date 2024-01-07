"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const express_validator_1 = require("express-validator");
class AppController {
    register(app) {
        this.actions.forEach((ActionConstructor) => {
            const action = new ActionConstructor();
            app[action.method](`${this.path}/${action.route}`, ...action.validators, this.createActionHandler(action));
        });
    }
    createActionHandler(action) {
        return async (req, res) => {
            const result = (0, express_validator_1.validationResult)(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }
            await action.process(req, res);
        };
    }
}
exports.AppController = AppController;
