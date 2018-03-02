import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Recipes from './recipes';
import Featured from './featured';
import * as actionCreators from '../../redux/action-creators';

/*
 * App
 * caller: renderView.jsx (server side render) and main.jsx (client side render)
 */
class RecipeApp extends React.Component {
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
          <Recipes {...this.props} />
          <Featured {...this.props.featuredRecipe} />
        </div>
        <div className="ui inverted vertical footer segment">
            Footer
        </div>
      </div>
    );
  }
}

// This function lets you convert the app state to properties on your component.
function mapStateToProps(state) {
  const { recipes, featuredRecipe } = state.recipes;
  return {
    recipes,
    featuredRecipe
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
export default connect(mapStateToProps, mapDispatchToProps)(RecipeApp);
