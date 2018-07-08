import React from 'react';
import { renderRoutes } from 'react-router-config';


class Main extends React.Component {
  render() {
    const community = {community: this.props.community}
    return (
      <div>
        {renderRoutes(this.props.routes, community)}
      </div>
    )
  }
}

export default Main;
