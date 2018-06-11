import React from 'react';
import fetch from 'isomorphic-fetch';
import TopNav from '../../../components/TopNavUser';
import People from './People';

// This is a ES6 class - see https://toddmotto.com/react-create-class-versus-component/
class Main extends React.Component {

  render() {
    console.log("Project page.....", this.props.user)
        console.log("Project page.....", this.props.project)
        console.log("state", this.props.state)
    return (
      <div className="section-white">
        <TopNav route={this.props.route} user={this.props.user} useExternLinks={true}/>
        <div className="container">
          <h4>{this.props.project.title}</h4>
          <p>{this.props.project.description}</p>
          <h4>Project Contributors</h4>
          <People />
        </div>
      </div>
    );
  }
}

export default Main;
