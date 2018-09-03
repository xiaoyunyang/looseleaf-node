import React from 'react';
import { renderToString } from 'react-dom/server';
import chalk from 'chalk';
import { Provider } from 'react-redux';
import configureStore from '../src/shared/redux/configureStore/projectPage';
import HTML from '../src/shared/ProjectPage/HTML';
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

  const app = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
	);
  const html = renderToString(
    <HTML
      meta={meta}
      dataToSerialize={dataToSerialize}
      html={app}
    />
  );
  return res.send(`<!DOCTYPE html>${html}`);

}
