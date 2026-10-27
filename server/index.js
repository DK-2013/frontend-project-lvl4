// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import path from 'path';
import Pug from 'pug';
import socket from 'socket.io';
import fastify from 'fastify';
import pointOfView from 'point-of-view';
import fastifyStatic from 'fastify-static';
// import _ from 'lodash';
import addRoutes from './routes.js';

const isProduction = process.env.NODE_ENV === 'production';
const appPath = path.join(__dirname, '..');
const isDevelopment = !isProduction;

const viteDevDomain = 'http://localhost:8080';

const setUpViews = (app) => {
  app.register(pointOfView, {
    engine: {
      pug: Pug,
    },
    defaultContext: {
      isDevelopment,
      // В production Vite кладёт бандл в dist/public c префиксом /assets,
      // который раздаёт fastify-static (см. setUpStaticAssets).
      cssHref: isDevelopment ? null : '/assets/main.css',
      entrySrc: isDevelopment ? `${viteDevDomain}/src/index.js` : '/assets/main.js',
      viteClientSrc: isDevelopment ? `${viteDevDomain}/@vite/client` : null,
    },
    templates: path.join(__dirname, 'views'),
  });
};

const setUpStaticAssets = (app) => {
  app.register(fastifyStatic, {
    root: path.join(appPath, 'dist/public'),
    prefix: '/assets',
  });
};

export default (options) => {
  const app = fastify();

  setUpViews(app);
  setUpStaticAssets(app);

  const io = socket(app.server);

  addRoutes(app, io, options.state || {});

  return app;
};
