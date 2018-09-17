import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import chalk from 'chalk';
import { Provider } from 'react-redux';
import configureStore from '../src/shared/redux/configureStore/explorePage';
import HTML from '../src/shared/Explore/HTML';
import { routes } from '../src/shared/Explore/routes';
import App from '../src/shared/Explore/App';

export default function renderExploreApp(req, res, next) {
  // console.log(chalk.green('title', project['title']))

  const preloadedState = {
    user: { loggedinUser: req.user }
  };

  const store = configureStore(preloadedState);
  const dataToSerialize = preloadedState;

  const meta = {
    title: `Explore ${req.params.toExplore} - LooseLeaf`
  };

  const branch = matchRoutes(routes, req.url);

  const promises = branch.map(({ route, match }) => {
    return route.loadData
      ? route.loadData(match)
      : Promise.resolve(null)
  });

  Promise.all(promises).then(data => {
  	const context = data.reduce( (context, data) => {
  		return Object.assign(context, data)
  	}, {})

		const app = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context} >
          <App />
        </StaticRouter>
      </Provider>
		);

    if(context.url) {
			res.writeHead(301, {Location: context.url})
			res.end()
		}
    const html = renderToString(
      <HTML
        meta={meta}
        dataToSerialize={dataToSerialize}
        html={app}
      />
    );
    return res.send(`<!DOCTYPE html>${html}`);
  });

}
