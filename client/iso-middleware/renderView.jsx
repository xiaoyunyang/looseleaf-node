import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import initRedux from '../src/redux/init-redux.es6';
import * as actions from '../src/redux/action-creators.es6';
import HTML from '../src/components/Recipe/html';
import App from '../src/components/Recipe/app';

/**
 * [renderView description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export default function renderView(req, res, next) {
  const store = initRedux();
  // Fetch data for the route
  // This example only has one route
  // so we assume it needs the getHomePageData action
  store.dispatch(actions.getHomePageData()).then(() => {
    let html;
    const dataToSerialize = store.getState();
    console.log("data to serialize", dataToSerialize)
    // render main view
    html = ReactDOM.renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const renderedHTML = ReactDOM.renderToString(
      <HTML data={`window.__INITIAL_STATE =
        ${JSON.stringify(dataToSerialize)}`}
            html={html} />
    )
    res.send(renderedHTML)

  });
}
