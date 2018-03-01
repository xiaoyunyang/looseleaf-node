import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '../shared/routes';
import HTML from '../shared/components/HTML';

export default function renderRoute(req, res, next) {
  const match = routes.reduce((acc, route) =>
    matchPath(req.url, route, { exact: true }) || acc, null);

  if (!match) {
    res.status(404).send('not found');
    return;
  }

  const context = {
    splitPoints: []
  };
  const app = renderToString(
    <StaticRouter location={req.url} context={context}>
      {renderRoutes(routes)}
    </StaticRouter>
  );
  const html = renderToString(
    <HTML html={app}/>
  );
  res.send(`<!DOCTYPE html>${html}`);
}
