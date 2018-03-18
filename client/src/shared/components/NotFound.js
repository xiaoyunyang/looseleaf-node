import React from 'react';
import { Route } from 'react-router-dom';

const Status = ({ code, children }) => (
	<Route render={({ staticContext }) => {
		if (staticContext)
			staticContext.status = code
		return children
	}}/>
);

const NotFound = () => (
  <Status code={404}>
    <div>
      {
        console.log('rendering NotFound')
      }
      <h1>Sorry!</h1>
      <p>Something went horribly wrong…</p>
    </div>
  </Status>
);

export default NotFound
