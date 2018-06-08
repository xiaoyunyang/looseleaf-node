import React from 'react';
import fetch from 'isomorphic-fetch';
import TopNav from '../../components/TopNavUser';


// This is a ES6 class - see https://toddmotto.com/react-create-class-versus-component/
class Home extends React.Component {

  render() {
    return (
      <div className="section-white">
        <TopNav route={this.props.route} user={this.props.user}/>
        <div className="container">
          <h3>Project Stuff</h3>
        </div>
      </div>
    );
  }
}

export default Home;
