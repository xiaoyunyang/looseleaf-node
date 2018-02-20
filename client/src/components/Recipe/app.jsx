import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Recipes from './recipes';
import Featured from './featured';
import * as actionCreators from '../../redux/action-creators';

class App extends React.Component {

  componentDidMount() {
    this.props.actions.getHomePageData();
  }

  render() {
      return (
          <div>
            <div className="ui fixed inverted menu">
              <div className="ui contianer">
                <a href="/" className="header item">Recipes Example App</a>
              </div>
            </div>
            <div className="ui padded grid">
              <Recipes {...this.props}/>
              <Featured {...this.props.featuredRecipe}/>
            </div>
            <div className="ui inverted vertical footer segment">
            Footer
            </div>
          </div>
      );
  }
}

function mapStateToProps(state) {
  let { recipes, featuredRecipe } = state.recipes;
  return {
    recipes,
    featuredRecipe
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
