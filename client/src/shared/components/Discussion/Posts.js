import React from 'react';
import PropTypes from 'prop-types';
import PostDisplay from './PostDisplay';
import PostEditor from './PostEditor2';
import { getApiData } from '../../../lib/helpers';
import { image } from '../../data/assetLinks';
import { apiLink } from '../../data/apiLinks';
import { postToApiData } from '../../../lib/helpers';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDisplayName: 'Firstname Lastname',
      userPic: image.defaultUser,
      username: '',
      editMode: false,
      editorContent: this.props.content
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
  handleToggleEditMode(editModeOn) {
    this.setState({
      editMode: editModeOn
    });
  }
  handleEditPost(editedContent, postId) {
    console.log('handleEditPost triggered!')
    console.log('editedContent', editedContent)
    console.log('typeof editedContent', typeof editedContent)
    console.log('postId', postId)
    const url = apiLink.postEdit(postId);
    const data = { content: editedContent };
    const cbFailure = () => {};
    const cbSuccess = (status, msg) => {
      this.setState({
        editMode: false,
        editorContent: msg
      });
    };
    postToApiData(url, data , cbFailure, cbSuccess);

  }
  render() {
    return (
      <div key={`post-${this.props.id}`}>
        { this.state.editMode ?
          <PostEditor
            userDisplayName={this.state.userDisplayName}
            userPic={this.state.userPic}
            editorContent={this.state.editorContent}
            placeholder='Write something.'
            handleToggleEditMode={this.handleToggleEditMode.bind(this)}
            handlePost={editedContent => this.handleEditPost(editedContent, this.props.postId) }
          />
          :
          <PostDisplay
            userDisplayName={this.state.userDisplayName}
            userPic={this.state.userPic}
            username={this.state.username}
            userId={this.props.userId}
            postId={this.props.postId}
            editorContent={this.state.editorContent}
            loggedInAs={this.props.loggedInAs}
            deletePost={this.props.deletePost}
            handleToggleEditMode={this.handleToggleEditMode.bind(this)}
          />
        }
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
