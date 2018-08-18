import React from 'react';
import { renderToString } from 'react-dom/server';
import chalk from 'chalk';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import initRedux from '../src/shared/redux/Project/init-redux';
import * as actions from '../src/shared/redux/Project/actions/project';
import HTML from '../src/shared/ProjectPage/HTML';
import App from '../src/shared/ProjectPage/App';

export default function renderProjectApp(req, res, next) {
  //  console.log('preloadedState type: ', (typeof preloadedState));
  const slug = req.params.slug;
  const store = initRedux();

  // Data preloading
  store.dispatch(actions.getProjectPageData(slug)).then(() => {
    const dataToSerialize = store.getState();
    const meta = {
      title: dataToSerialize.project.info.title
    }
    // console.log(chalk.magenta("meta", JSON.stringify(meta)));
    // console.log(chalk.cyan("data to serialize", JSON.stringify(dataToSerialize)));
    const app = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
		);
    const html = renderToString(
      <HTML
        meta={meta}
        dataToSerialize={dataToSerialize}
        html={app}/>
    );
    return res.send(`<!DOCTYPE html>${html}`);
  });

}
