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
      editorContent: this.props.post.content
    };
  }
  componentDidMount() {
    this.fetchUserInfo(this.props.post.postedBy);
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
      <div key={`post-${this.props.post._id}`}>
        { this.state.editMode ?
          <PostEditor
            userDisplayName={this.state.userDisplayName}
            userPic={this.state.userPic}
            editorContent={this.state.editorContent}
            placeholder='Write something.'
            handleToggleEditMode={this.handleToggleEditMode.bind(this)}
            handlePost={editedContent => this.handleEditPost(editedContent, this.props.post._id) }
          />
          :
          <PostDisplay
            userDisplayName={this.state.userDisplayName}
            userPic={this.state.userPic}
            username={this.state.username}
            userId={this.props.post.postedBy}
            postId={this.props.post._id}
            editorContent={this.state.editorContent}
            loggedinUser={this.props.loggedinAs}
            deletePost={this.props.deletePost}
            handleToggleEditMode={this.handleToggleEditMode.bind(this)}
          />
        }
      </div>
    );
  }
}

// TODO: change Posts's props from loggedInAs to 'loggedinAs'
// Post.propTypes = {
//   post: PropTypes.object,
//   loggedinAs: PropTypes.string,
//   deletePost: PropTypes.func
// };

export default Post;
