import React from 'react';
import Switch from 'react-router/Switch';
import { Route, Redirect } from 'react-router-dom';

// The authed flown down from the caller of renderRoutes tells the renderRoutes
// if the user is authed to view private pages.
/** *
TODO: Send a pull request to react-router-config for this file
https://github.com/ReactTraining/react-router/blob/master/packages/react-router-config/modules/renderRoutes.js
** */
const renderRoutes = (routes, authed, authPath, extraProps = {}, switchProps = {}) => (routes ? (
  <Switch {...switchProps}>
    {routes.map((route, i) => (
      <Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={(props) => {
          const redirPath = authPath || '/login';

          if (!route.restricted || authed || route.path === authPath) {
            return <route.component {...props} {...extraProps} route={route} />;
          }
          return <Redirect to={{ pathname: redirPath, state: { from: props.location } }} />;
        }}
      />
    ))}
  </Switch>
) : null);

export default renderRoutes;
