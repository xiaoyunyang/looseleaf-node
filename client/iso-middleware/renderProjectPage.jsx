import React from 'react';
import { renderToString } from 'react-dom/server';
import chalk from 'chalk';
import { Provider } from 'react-redux';
import initRedux from '../src/shared/redux/Project/init-redux';
import configureStore from '../src/shared/redux/Project/configureStoreGuest';
import * as actions from '../src/shared/redux/Project/actions/project';
import HTML from '../src/shared/ProjectPage/HTML';
import App from '../src/shared/ProjectPage/App';

const decodeHTMLEntities = (text) => {
  const entities = [
      ['amp', '&'],
      ['apos', '\''],
      ['#x27', '\''],
      ['#x2F', '/'],
      ['#39', '\''],
      ['#47', '/'],
      ['lt', '<'],
      ['gt', '>'],
      ['nbsp', ' '],
      ['quot', '"']
  ];

  for (let i = 0, max = entities.length; i < max; ++i)  {
      text = text.replace(
        new RegExp('&'+entities[i][0]+';', 'g'),
        entities[i][1]);
  }

  return text;
}

export default function renderProjectApp(req, res, next, project) {
  // console.log(chalk.green(typeof project))
  // console.log(chalk.green('title', project['title']))
  //  console.log('preloadedState type: ', (typeof preloadedState));

  /* Expected redux state:
    {
      project: {info: {...}, contributors: {...}},
      actions: {...}
    }
    }
   */
  const preloadedState = {
    project: { info: project }
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
      html={app}/>
  );
  return res.send(`<!DOCTYPE html>${html}`);


    // const slug = req.params.slug;
  // const store = initRedux();
  //
  // // Data preloading
  // store.dispatch(actions.getProjectPageData(slug)).then(() => {
  //   const dataToSerialize = store.getState();
  //   const meta = {
  //     title: dataToSerialize.project.info.title
  //   }
  //   // console.log(chalk.magenta("meta", JSON.stringify(meta)));
  //   // console.log(chalk.cyan("data to serialize", JSON.stringify(dataToSerialize)));
  //   const app = renderToString(
  //     <Provider store={store}>
  //       <App />
  //     </Provider>
	// 	);
  //   const html = renderToString(
  //     <HTML
  //       meta={meta}
  //       dataToSerialize={dataToSerialize}
  //       html={app}/>
  //   );
  //   return res.send(`<!DOCTYPE html>${html}`);
  // });

}
