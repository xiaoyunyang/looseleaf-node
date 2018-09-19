import React from 'react';
// import PropTypes from 'prop-types';
import Discussion from './Main';

export default class Comments extends React.Component {
  render() {
    return (
      <div style={{ paddingLeft: '5%'}}>
        <Discussion
          context='post'
          postId={this.props.postId}
          loggedinUser={this.props.loggedinUser}
          newPostPlaceholder='Post a comment.'
          readOnly={!this.props.loggedinUser}
          itemName='comments'
        />
      </div>

    );
  }

}
