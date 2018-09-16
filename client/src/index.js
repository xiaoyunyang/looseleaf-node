import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import './lib/tabs'; // <- overriding the materialize tabs js
import './lib/chips'; // <- overriding the materialize chips js
// import AppOld from './craApps/App';
import AppUser from './craApps/AppUser';
import AppUserPage from './craApps/AppUserPage';
import AppProjectPage from './craApps/AppProjectPage';
import AppCommunityUser from './craApps/AppCommunityUser';
import AppCommunityGuest from './craApps/AppCommunityGuest';
import AppLanding from './craApps/AppLanding';
import AppRecipe from './craApps/AppRecipe';
import './assets/index.css';
import 'draft-js/dist/Draft.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';

/*
 * Main entry point for the create-react-app
 */
const Apps = {
  user: AppUser,
  userPage: AppUserPage,
  projectPage: AppProjectPage,
  communityUser: AppCommunityUser,
  communityGuest: AppCommunityGuest,
  landing: AppLanding,
  recipe: AppRecipe
};

const App = Apps.communityUser;

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
