import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import initRedux from '../src/shared/redux/Recipe/init-redux';
import * as actions from '../src/shared/redux/Recipe/action-creators';
import HTML from '../src/shared/Recipe/HTML';
import App from '../src/shared/Recipe/App';

/**
 * Express middleware receives the request
 * object, the response object and a next callback for passing control to the
 * next middleware in the chain.
 */
export default function renderView(req, res, next) {

  // Setup the Redux reducers and compose the store. On the server,
  // it starts with an empty store.
  const store = initRedux();

  // Fetch data for the route
  // This example only has one route
  // so we assume it needs the getHomePageData action
  store.dispatch(actions.getHomePageData()).then(() => {
    let html;
    const dataToSerialize = store.getState(); // Serialize the data so you can pass the state down to the browser.
    console.log("data to serialize", dataToSerialize)
    // render main view
    // Render the components by rendering app.jsx and injecting the data you fetched in the previous step.
    html = ReactDOM.renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Render the full HTML page by rendering html.jsx with the previously rendered components and the serialized data.
    const renderedHTML = ReactDOM.renderToString(
      <HTML data={`window.__PRELOADED_STATE__ =
        ${JSON.stringify(dataToSerialize)}`}
            html={html} />
    )
    res.send(renderedHTML)

  });
}
