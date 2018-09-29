import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import configureStore from '../src/shared/redux/configureStore/explorePage';
import HTML from '../src/shared/components/HTML';
import { routes } from '../src/shared/Explore/routes';
import App from '../src/shared/Explore/App';

export default function renderExploreApp(req, res, next) {
  const meta = {
    title: `Explore ${req.params.toExplore} - LooseLeaf`,
    desc: 'Get your projects done for free',
    url: req.url
  };
  const clientAppPath = '/explore.bundle.js';

  const preloadedState = {
    user: { loggedinUser: req.user }
  };

  const store = configureStore(preloadedState);

  const dataToSerialize = preloadedState;

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
        html={app}
        dataToSerialize={dataToSerialize}
        clientAppPath={clientAppPath}
      />
    );
    return res.send(`<!DOCTYPE html>${html}`);
  }).catch(reason => {
    console.log(reason)
  });

}
