import React from 'react';

const Recipes = (props) => {
  const renderRecipeItems = () => {
    const items = [];
    if (!props.recipes) {
      return items;
    }
    props.recipes.forEach((item, index) => {
      if (!item.featured) {
        items.push(
          <div key={item.title + index} className="col l4 s12 m5">
            <div className="card">
              <div className="card-image">
                <img alt={item.thumbnail} src={`http://localhost:3001/api/assets/${item.thumbnail}`} />

                  <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
                </div>
                <div className="card-content">
                  <span className="card-title">{item.title}</span>
                  <div className="meta time">Cook Time: {item.cookTime}</div>
                  <div className="meta servings">Servings: {item.servings}</div>
                  <div className="meta difficulty">Difficulty: {item.difficulty}</div>
                  <div className="description">Tags: {item.labels.join(', ')}</div>
                </div>
              </div>
            </div>
          );
      }
    });
    return items;
  };

  return (
    <div className="row">
      {renderRecipeItems()}
    </div>
  );
};

export default Recipes;
