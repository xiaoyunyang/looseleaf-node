import initRedux from '../src/shared/redux/Recipe/init-redux';
// import * as recipeActions from '../src/shared/redux/Recipe/actions/recipes';
// import * as projectActions from '../src/shared/redux/Recipe/actions/projects';

// TODO: server calls this function to render data to '/api/hello-recipe'. We
// need to change this to render data to /api/user or something like that
import * as actions from '../src/shared/redux/actions/page';
import chalk from 'chalk';

export default function dataPreloading(req, res, next) {

  // const actions = { ...projectActions, ...recipeActions  };
  console.log('actions', actions);

  // Setup the Redux reducers and compose the store. On the server,
  // it starts with an empty store.
  const store = initRedux();

  // Fetch data for the route
  // This example only has one route
  // so we assume it needs the getHomePageData action
  return store.dispatch(actions.getHomePageData()).then(() => {
    const dataToSerialize = store.getState(); // Serialize the data so you can pass the state down to the browser.
    // console.log(chalk.green("data to serialize", dataToSerialize));
    // console.log(chalk.red("serialized data", JSON.stringify(dataToSerialize)));
    return res.send(JSON.stringify(dataToSerialize));
  });
}
