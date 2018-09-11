import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const Posts = ({ posts, deletePost, noPostDisp, loggedinAs }) => (
  <div>
    { posts && posts.length>0 ?
      posts.map(post => {
        return (
          <div key={`post-${post._id}`}>
            <Post
              post={post}
              loggedinAs={loggedinAs}
              deletePost={deletePost}
            />
          </div>
        );
      })
      :
      <p>{noPostDisp}</p>
    }
  </div>
);
// TODO: change Posts's props from loggedInAs to 'loggedinAs'
Posts.propTypes = {
  posts: PropTypes.array,
  noPostDisp: PropTypes.string,
  loggedInAs: PropTypes.object,
};
Posts.defaultProps = {
  noPostDisp: 'No post found.',
  loggedInAs: {}
};

export default Posts;
