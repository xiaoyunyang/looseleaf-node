import React from 'react';
import Discussion from '../Discussion/Main';

export default class Two extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null
    };
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <h3>Posts</h3>
          <Discussion
            context='user'
            userId={this.props.userId}
            loggedinUser={this.props.loggedinAs}
            readOnly
            showContext={true}
          />
        </div>
      </div>
    );
  }
}
