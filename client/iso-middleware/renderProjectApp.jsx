import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import configureStore from '../src/shared/redux/Project/configureStore';
import { getRoutes } from '../src/shared/Project/routes';
import HTML from '../src/shared/Project/HTML';
import App from '../src/shared/Project/App';

export default function renderProjectApp(req, res, next) {
  //  console.log('preloadedState type: ', (typeof preloadedState));
  const slug = req.params.slug;

  // TODO: Don't pass the entire req.user into client app. Only pass what's
  // absolutely necessary to render and to associate user with other data.
  // The user object contains a lot of authentication info.
  const preloadedState = {
    user: req.user,
    slug: req.params.slug
  }
  const store = configureStore(preloadedState);
  const dataToSerialize = preloadedState;


  const branch = matchRoutes(getRoutes(req.user.username), req.url);

  const promises = branch.map(({ route, match }) => {
    return route.loadData
      ? route.loadData(match)
      : Promise.resolve(null)
  });

  Promise.all(promises).then(data => {
    // data will be an array[] of datas returned by each promises.
  	const context = data.reduce( (context, data) => {
  		return Object.assign(context, data)
  	}, {})

		const app = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context} slug={slug} >
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
        title={req.params.slug}
        userData={dataToSerialize}
        html={app}/>
    );
    return res.send(`<!DOCTYPE html>${html}`);
  });
}
