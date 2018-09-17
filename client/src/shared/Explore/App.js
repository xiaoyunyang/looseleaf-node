import React from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/actions/page';
import { routes } from './routes';

class AppContainer extends React.Component {
  render() {
    return (
      <App {...this.props} />
    );
  }
}
const App = ({ state, actions }) => (
  <div>
    {renderRoutes(routes, { state })}
  </div>
);

// This function lets you convert the app state to properties on your component.
function mapStateToProps(state) {
  return {state: state};
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppContainer)
);
