import React from 'react';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import TopNav from '../TopNav';

// Note, we need Switch to wrap renderRoutes here because this is a nested route.
// if you don't wrap it in Switch, the NotFound page will not get correctly routed
// for some reason
const Book = ({ route }) => (
  <div>
    <TopNav route={route} />
    <Switch>
      {renderRoutes(route.routes)}
    </Switch>
  </div>
);

export default Book;
