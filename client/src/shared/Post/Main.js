import React from 'react';
import { renderRoutes } from 'react-router-config';

class Main extends React.Component {
  render() {
    const appProps = {
      user: this.props.state.user,
      post: this.props.state.post,
      actions: this.props.actions
    }
    return (
      <div>
        {renderRoutes(this.props.routes, appProps)}
      </div>
    )
  }
}
export default Main;
