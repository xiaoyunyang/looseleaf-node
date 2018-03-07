import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import routes from '../src/shared/Profile/routes';
import HTML from '../src/shared/Profile/HTML';
import App from '../src/shared/Profile/App';

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
}
