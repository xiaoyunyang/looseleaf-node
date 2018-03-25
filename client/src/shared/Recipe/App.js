import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Recipes from './Recipes';
import Featured from './Featured';
import * as actionCreators from '../redux/Recipe/actions/recipes';
// import * as actionCreators from '../redux/Recipe/actions/projects';
import Footer from '../components/Footer';
/*
 * App
 * caller: renderView.js (server side render) and recipe.js (client side render)
 */
class App extends React.Component {
  componentDidMount() {
    this.props.actions.getHomePageData();
  }

  render() {
    return (
      <div>
        <div className="navbar-fixed">
          <nav className="grey lighten-4">
            <div className="nav-wrapper-white nav-text-links">
              <div className="brand-logo">
                <a href="/">Recipes App</a>
              </div>
            </div>
          </nav>
        </div>
        <div className="container main">
          <Featured {...this.props.featuredRecipe} />
          <h4>{'More like this'}</h4>
          <Recipes {...this.props} />
        </div>
        <Footer />
      </div>
    );
  }
}

// This function lets you convert the app state to properties on your component.
function mapStateToProps(state) {
  const { recipes, featuredRecipe } = state.recipes;
  const { newProjects, completedProjects } = state.projects;
  return {
    recipes,
    featuredRecipe,
    newProjects,
    completedProjects,
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
