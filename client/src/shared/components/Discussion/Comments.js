import React from 'react';
// import PropTypes from 'prop-types';
import Discussion from './Main';

// Comments is called by Post
export default class Comments extends React.Component {
  updateParent(updatedNum) {
    console.log('Comments....', updatedNum)
    this.props.updateParentPostCommentsNum(updatedNum);
  }
  render() {
    const context = {name: 'post', queryBy: this.props.postId};
    return (
      <div style={{ paddingLeft: '5%'}}>
        <Discussion
          context={context}
          loggedinUser={this.props.loggedinUser}
          newPostPlaceholder='Post a comment.'
          readOnly={!this.props.loggedinUser}
          noPostDisp='No comment found.'
          updateParentPostCommentsNum={updatedNum => this.updateParent.bind(this, updatedNum)}
        />
      </div>
    );
  }

}
