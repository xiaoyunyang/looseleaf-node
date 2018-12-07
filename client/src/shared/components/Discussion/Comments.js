import React from 'react';
import PropTypes from 'prop-types';
import Discussion from './Main';

// Comments is called by Post
const Comments = ({
  postId,
  loggedinUser,
  updateParentPostCommentsNum
}) => (
  <div style={{ paddingLeft: '5%' }}>
    <Discussion
      context={{ name: 'post', queryBy: postId }}
      loggedinUser={loggedinUser}
      newPostPlaceholder="Post a comment."
      readOnly={!loggedinUser}
      noPostDisp="No comment found."
      updateParentPostCommentsNum={updateParentPostCommentsNum}
    />
  </div>
);

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
  loggedinUser: PropTypes.object.isRequired,
  updateParentPostCommentsNum: PropTypes.func.isRequired
};

export default Comments;
