import React from 'react';

const LoadMoreBtn = ({ handleClick, itemName }) => (
  <div className="row center load-more-items">
    <a
      className="btn col s8 m6 l4 offset-s2 offset-m3 offset-l4"
      onClick={handleClick}
    >
      Load More {itemName}
    </a>
  </div>
)

export default LoadMoreBtn;
