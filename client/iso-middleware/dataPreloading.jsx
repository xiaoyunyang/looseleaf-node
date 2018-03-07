import initRedux from '../src/redux/Recipe/init-redux';
import * as actions from '../src/redux/Recipe/action-creators';

export default function dataPreloading(req, res, next) {

  // Setup the Redux reducers and compose the store. On the server,
  // it starts with an empty store.
  const store = initRedux();

  // Fetch data for the route
  // This example only has one route
  // so we assume it needs the getHomePageData action
  return store.dispatch(actions.getHomePageData()).then(() => {
    const dataToSerialize = store.getState(); // Serialize the data so you can pass the state down to the browser.
    console.log("data to serialize", dataToSerialize)
    console.log("serialized data", JSON.stringify(dataToSerialize));
    return res.send(JSON.stringify(dataToSerialize));
  });
}
