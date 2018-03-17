import React from 'react';
import TopNav from './TopNav';
import Main from './Main';

const App = () => (
  <div>
    <TopNav />
    <div className="container">
      <Main />
    </div>
  </div>
);

export default App;
