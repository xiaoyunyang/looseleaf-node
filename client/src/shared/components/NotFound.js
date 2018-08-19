import React from 'react';
import { Route } from 'react-router-dom';
import Footer from './Footer';

const containerStyle = {
  minHeight: '58vh',
  overflow: 'hidden',
  display: 'block',
  position: 'relative',
  paddingBottom: '23%',
  width: '85%'
};

const h1Style = {
  fontSize: '2em',
  fontWeight: '400'
};

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = code;
    }
		return children;
	  }}
  />
);

const NotFound = () => (
  <Status code={404}>
    <div style={containerStyle} className='main container hero-info center'>
      <h1 style={h1Style}>Page Not Found</h1>
      <p>Sorry, but the page you were trying to view does not exist.</p>
        <a className="waves-effect waves-light btn" href="/">Go to home page</a>
    </div>
    <Footer />
  </Status>
);

export default NotFound;
