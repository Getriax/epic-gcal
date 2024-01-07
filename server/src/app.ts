import dotenv from 'dotenv';
dotenv.config();

import express, { IRouter } from 'express';
import cors from 'cors';
import { controllers } from './controllers';

const PORT = process.env.PORT || 3000;

const registerControllers = (router: IRouter) => {
  controllers.forEach((Controller) => {
    const controller = new Controller();

    controller.register(router);
  });
};
const initApp = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const router = express.Router();
  registerControllers(router);

  app.use(router);

  return new Promise<void>((resolve) => {
    app.listen(PORT, () => {
      resolve();
    });
  });
};

initApp().then(() => console.log(`Server is running on port ${PORT}`));
