import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/Project/actions/project';
import Main from './screen/Main';

class App extends React.Component {
  componentDidMount() {
    // TODO: Get contributor data
  }

  render() {
    return (
      <Main
        projectInfo={this.props.project.info}
        contributors={this.props.project.contributors}
        user={this.props.user.info}
      />
    );
  }
}

// This function lets you convert the app state to properties on your component.
function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
