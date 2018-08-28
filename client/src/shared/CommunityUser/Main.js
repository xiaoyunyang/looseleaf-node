import React from 'react';
import { renderRoutes } from 'react-router-config';

export default class Main extends React.Component {
  render() {
    const appProps = {
      state: this.props.state,
      actions: this.props.actions
    }
    return (
      <div>
        {
          renderRoutes(this.props.routes, appProps)
        }
      </div>
    );
  }
}
