import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import configureStore from '../src/shared/redux/configureStore/communityGuestPage';
import { getRoutes } from '../src/shared/CommunityGuest/routes';
import HTML from '../src/shared/components/HTML';
import App from '../src/shared/CommunityGuest/App';

export default function renderCommunityGuestApp(req, res, next, community) {
  const meta = {
    title: `${community.name} - LooseLeaf`,
    desc: `${community.desc}`,
    url: req.url
  };
  const clientAppPath = '/communityguest.bundle.js';

  const preloadedState = {
    community: {info: community},
  }

  const store = configureStore(preloadedState);
  const dataToSerialize = preloadedState;

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
