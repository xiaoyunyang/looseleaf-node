import React from 'react';
import PropTypes from 'prop-types';
import PostDisplay from '../Form/PostDisplay';
import { getApiData } from '../../../lib/helpers';
import { image } from '../../data/assetLinks';
import { apiLink } from '../../data/apiLinks';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDisplayName: 'Firstname Lastname',
      userPic: image.defaultUser,
      username: ''
    };
  }
  componentDidMount() {
    this.fetchUserInfo(this.props.userId);
  }
  fetchUserInfo(id) {
    const setApiData = data => this.setState({
      userDisplayName: data[0].displayName,
      userPic: data[0].picture,
      username: data[0].username
    });
    const link = apiLink.userById(id);
    getApiData(link, setApiData);
  }
  render() {
    return (
      <div key={`post-${this.props.id}`}>
        <PostDisplay
          userDisplayName={this.state.userDisplayName}
          userPic={this.state.userPic}
          username={this.state.username}
          userId={this.props.userId}
          postId={this.props.postId}
          editorContent={this.props.content}
          loggedInAs={this.props.loggedInAs}
          deletePost={this.props.deletePost}
        />
      </div>
    );
  }
}
const Posts = ({ posts, deletePost, noPostDisp, loggedInAs }) => (
  <div>
    { posts && posts.length>0 ?
      posts.map(d => {
        return (
          <div key={`post-${d._id}`}>
            <Post
              userId={d.postedBy}
              content={d.content}
              postId={d._id}
              loggedInAs={loggedInAs}
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
Posts.propTypes = {
  posts: PropTypes.array,
  noPostDisp: PropTypes.string,
  loggedInAs: PropTypes.string,
};
Posts.defaultProps = {
  noPostDisp: 'No post found.',
  loggedInAs: 'none'
};

export default Posts;
