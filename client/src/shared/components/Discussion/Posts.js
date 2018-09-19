import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const Posts = ({
  posts,
  deletePost,
  noPostDisp,
  itemName,
  loggedinUser,
  showContext,
  showContextForUser
}) => (
  <div>
    {
      posts && posts.length>0 ?
      posts.map(post => {
        return (
          <div key={`post-${post._id}`}>
            <Post
              showContext={showContext}
              showContextForUser={showContextForUser}
              post={post}
              loggedinUser={loggedinUser}
              deletePost={deletePost}
            />
          </div>
        );
      })
      :
      <p>{`No ${itemName} found.`}</p>
    }
  </div>
);
// TODO: change Posts's props from loggedInAs to 'loggedinAs'
Posts.propTypes = {
  showContext: PropTypes.bool,
  showMoreContext: PropTypes.bool,
  posts: PropTypes.array,
  noPostDisp: PropTypes.string,
  itemName: PropTypes.string,
  loggedInUser: PropTypes.object,
};
Posts.defaultProps = {
  showContext: false,
  showMoreContext: false,
  itemName: 'posts',
  noPostDisp: 'No post found.',
  loggedInUser: {}
};

export default Posts;
