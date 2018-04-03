import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import configureStore from '../src/shared/redux/User/configureStore';
import { getRoutes } from '../src/shared/User/routes';
import HTML from '../src/shared/User/HTML';
import App from '../src/shared/User/App';

export default function renderUserApp(req, res, next) {
//  console.log('preloadedState type: ', (typeof preloadedState));
  const store = configureStore(req.user);
  const dataToSerialize = req.user;

console.log("DataToSerialize ......... "+ req.user)

  // console.log('dataToSerialize', dataToSerialize);

  const branch = matchRoutes(getRoutes(req.user.username), req.url)
  const promises = branch.map(({ route, match }) => {
    return route.loadData
      ? route.loadData(match)
      : Promise.resolve(null)
  });

  Promise.all(promises).then(data => {
    // data will be an array[] of datas returned by each promises.
  	// console.log(data)
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
      <HTML userData={dataToSerialize}
        html={app}/>
    );
    return res.send(`<!DOCTYPE html>${html}`);
  });
}
