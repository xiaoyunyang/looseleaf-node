import React from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { getRoutes } from './routes';
import * as actionCreators from '../redux/Project/actions/project';

class AppContainer extends React.Component {
  render() {
    return (
      <App {...this.props} />
    );
  }
}

const App2 = ({ state }) => (
  <div>
    {renderRoutes(getRoutes(state.user), state)}
  </div>
);

class App extends React.Component {
  componentDidMount() {
    // example of a slug is 'this-is-a-test-120s25q'. NOTE, we can force the app
    // to render any project page we want as long as we pass the slug into the
    // getProjectPageData
    // With the component configured to use Redux, you can dispatch actions from the view.
    // as shown below.
    // The slug has to come from props if it's server side rendered. For client test,
    // we are just getting the default slug, which returns nothing.

    // TODO: below code is a total hack. The project app renders a few pages but the
    // only time we want to call getProjectPageData is if the route is /project/:slug
    // Since we previously specify that /project/new and /project match on exact and
    // render the project creation page and the project index page, respectively,
    // we want to make sure we don't make unnecessary api calls to get project by slug
    // if we are rendering /project/new or /project
    if(this.props.location.pathname !== '/project/new'
        && this.props.location.pathname !== '/project/'
        && this.props.location.pathname !== '/project') {
        this.props.actions.getProjectPageData(this.props.state.slug);
    }

  }
  render() {
    return (
      <div>
        {renderRoutes(getRoutes(this.props.state.user), this.props.state)}
      </div>
    )
  }
}

// This function lets you convert the app state to properties on your component.
function mapStateToProps(state) {
  return {
    state: state
  };
}

// This function lets you make actions simpler to call from the component.
// Normally you have to call dispatch(action) each time you want to call an action.
// This allows the view to call the action without knowing about dispatch.
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

// Instead of exporting the App component, you export the connect component,
// which takes in the two helper functions and the App component as parameters.
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppContainer)
);
// export default App;
