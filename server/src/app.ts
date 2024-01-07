import dotenv from 'dotenv';
dotenv.config();

import express, { IRouter } from 'express';
import cors from 'cors';
import redoc from 'redoc-express';
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

  app.get('/docs/openapi.json', (req, res) => {
    res.sendFile('openapi.json', { root: '.' });
  });

  app.get(
    '/docs',
    redoc({
      title: 'API Docs',
      specUrl: '/docs/openapi.json',
      nonce: '', // <= it is optional,we can omit this key and value
      // we are now start supporting the redocOptions object
      // you can omit the options object if you don't need it
      // https://redocly.com/docs/api-reference-docs/configuration/functionality/
      redocOptions: {
        theme: {
          colors: {
            primary: {
              main: '#6EC5AB',
            },
          },
          typography: {
            fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
            fontSize: '15px',
            lineHeight: '1.5',
            code: {
              code: '#87E8C7',
              backgroundColor: '#4D4D4E',
            },
          },
          menu: {
            backgroundColor: '#ffffff',
          },
        },
      },
    })
  );

  return new Promise<void>((resolve) => {
    app.listen(PORT, () => {
      resolve();
    });
  });
};

initApp().then(() => console.log(`Server is running on port ${PORT}`));
