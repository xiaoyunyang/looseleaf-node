import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import routes from '../shared/routes';
import HTML from '../shared/components/HTML';
import App from '../shared/App';

export default function renderRoute(req, res, next) {
  const branch = matchRoutes(routes, req.url)
  const promises = [];

  branch.forEach( ({route, match}) => {
    if (route.loadData)
  	 promises.push(route.loadData(match))
	});

  Promise.all(promises).then(data => {
    // data will be an array[] of datas returned by each promises.
  	// console.log(data)

  	const context = data.reduce( (context, data) => {
  		return Object.assign(context, data)
  	}, {})

		const app = renderToString(
			<StaticRouter location={req.url} context={context} >
				<App />
			</StaticRouter>
		);
    const html = renderToString(
      <HTML html={app}/>
    );
    return res.send(`<!DOCTYPE html>${html}`);
  });
/*
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
*/
}
