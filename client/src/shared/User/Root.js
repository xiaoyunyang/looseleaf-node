import React from 'react';
import Main from './Main';

/*
const Root = ({ route }) => (
  <Main routes={route.routes} />
)

*/
class Root extends React.Component {
  render() {
    return <Main props={this.props} routes={this.props.route.routes} user={this.props.user} />
  }
}

export default Root;
