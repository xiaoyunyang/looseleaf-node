import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import configureStore from '../src/shared/redux/Community/configureStore';
import { getRoutes } from '../src/shared/Community/routes';
import HTML from '../src/shared/Community/HTML';
import App from '../src/shared/Community/App';

export default function renderCommunityApp(req, res, next, community) {

  const store = configureStore(community);
  const dataToSerialize = community;

  const branch = matchRoutes(getRoutes(community.name), req.url)

  const promises = branch.map(({ route, match }) => {
    return route.loadData
      ? route.loadData(match)
      : Promise.resolve(null)
   })

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
      <HTML data={dataToSerialize} html={app}/>
    );
    return res.send(`<!DOCTYPE html>${html}`);
  });
}
