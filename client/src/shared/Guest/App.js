import React from 'react';
import TopNav from './TopNav';
import Main from './Main';
import Footer from '../components/Footer';
const App = () => (
  <div>
    <TopNav />
    <div className="container">
      <Main />
    </div>
    <Footer />
  </div>
);

export default App;
