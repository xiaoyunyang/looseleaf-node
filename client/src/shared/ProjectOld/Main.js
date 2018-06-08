import React from 'react';
import { renderRoutes } from 'react-router-config';

class Main extends React.Component {
  render() {
    const user = {user: this.props.user}
    return (
      <div>
        {renderRoutes(this.props.routes, user)}
      </div>
    )
  }
}
export default Main;
