import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import chalk from 'chalk';
import { Provider } from 'react-redux';
import configureStore from '../src/shared/redux/configureStore/projectPage';
import HTML from '../src/shared/ProjectPage/HTML';
import { getRoutes } from '../src/shared/ProjectPage/routes';
import App from '../src/shared/ProjectPage/App';
import { decodeHTMLEntities } from '../src/lib/helpers';

export default function renderProjectApp(req, res, next, project) {
  // console.log(chalk.green('title', project['title']))

  /* Expected redux state:
    {
      project: {info: {...}, contributors: {...}},
      user: {info: {...}}
      actions: {...}
    }
    }
   */
  const preloadedState = {
    project: { info: project },
    user: {loggedinUser: req.user }
  }
  const store = configureStore(preloadedState);

  const dataToSerialize = preloadedState;
  const meta = {
    title: decodeHTMLEntities(project.title)
  };
  const branch = matchRoutes(getRoutes(project.slug), req.url);
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
      <HTML
        meta={meta}
        dataToSerialize={dataToSerialize}
        html={app}
      />
    );
    return res.send(`<!DOCTYPE html>${html}`);
  });

}
