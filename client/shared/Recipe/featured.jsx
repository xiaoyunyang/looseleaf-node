import React from 'react';

const Featured = (props) => {
  const buildIngredients = (ingredients) => {
    const list = [];

    ingredients.forEach((ingredient, index) => {
      list.push(<li
        className="item"
        key={`${ingredient}-${index}`}
      >
        {ingredient}
                </li>);
    });

    return list;
  };

  const buildSteps = (steps) => {
    const list = [];

    steps.forEach((step, index) => {
      list.push(<li
        className="item"
        key={`${step}-${index}`}>
        {step}
        </li>);
    });
    return list;
  };

  return (
    <div className="featured ui container segment six wide column">
      <div className="ui large image">
        <img alt='thumbnail' src={`http://localhost:3001/api/assets/${props.thumbnail}`} />
      </div>
      <h3>{props.title}</h3>
      <div className="meta">Cook Time: {props.cookTime}</div>
      <div className="meta">Difficulty: {props.difficulty}</div>
      <div className="meta">Servings: {props.servings}</div>
      <div className="meta">Tags: {props.labels.join(', ')}</div>
      <h4>Ingredients</h4>
      <div className="ui bulleted list">
        {buildIngredients(props.ingredients)}
      </div>
      <h4>Steps</h4>
      <div className="ui ordered list">
        {buildSteps(props.steps)}
      </div>
    </div>
  );
};

export default Featured;
