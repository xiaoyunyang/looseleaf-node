import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import './lib/tabs' // <- overriding the materialize tabs js
// import AppOld from './craApps/App';
import AppUser from './craApps/AppUser';
import AppProject from './craApps/AppProject';
import AppGuest from './craApps/AppGuest';
import AppCommunity from './craApps/AppCommunity';
import AppLanding from './craApps/AppLanding';
import AppRecipe from './craApps/AppRecipe';
import './assets/index.css';

/*
 * Main entry point for the create-react-app
 */
const Apps = {
  'user': AppUser,
  'project': AppProject,
  'guest': AppGuest,
  'community': AppCommunity,
  'landing': AppLanding,
  'recipe': AppRecipe
}

const App = Apps.project;

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

// Wrapping App inside of AppContainer, which is a react-hot-loader component
render(App);


// Webpack Hot Module Replacement API
/*
if (module.hot) {
  console.log('module is hot');
  module.hot.accept('./App', () => {
    render(App);
  });
}*/
