import React from 'react';
import Discussion from '../Discussion/Main';

export default class Two extends React.Component {
  render() {
    const context = {name: 'user', queryBy: this.props.userId};
    return (
      <div className="container">
        <div className="row">
          <h3>Posts</h3>
          <Discussion
            context={context}
            loggedinUser={this.props.loggedinAs}
            readOnly
            showContext={true}
          />
        </div>
      </div>
    );
  }
}
