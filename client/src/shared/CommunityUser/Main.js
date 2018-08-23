import React from 'react';
import { renderRoutes } from 'react-router-config';

export default class Main extends React.Component {
  render() {
    const state = {
      user: this.props.user.info,
      community: this.props.community.info
    };
    return (
      <div>
        {renderRoutes(this.props.routes, state)}
      </div>
    );
  }
}
