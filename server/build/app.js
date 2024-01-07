"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./controllers");
const PORT = process.env.PORT || 3000;
const registerControllers = (router) => {
    controllers_1.controllers.forEach((Controller) => {
        const controller = new Controller();
        controller.register(router);
    });
};
const initApp = async () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    const router = express_1.default.Router();
    registerControllers(router);
    app.use(router);
    return new Promise((resolve) => {
        app.listen(PORT, () => {
            resolve();
        });
    });
};
initApp().then(() => console.log(`Server is running on port ${PORT}`));
