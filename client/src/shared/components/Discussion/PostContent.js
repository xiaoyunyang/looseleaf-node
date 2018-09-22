import React from 'react';
import PropTypes from 'prop-types';
import { Editor  } from 'draft-js';
import PostEditMenu from './PostEditMenu';
import { convertToEditorStateWithDecorator as convertToEditorState } from './draftjsHelpers';
import { UserInfo } from './PostParts';

class PostContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientModeOn: false
    }
  }
  componentDidMount() {
    this.setState({
      clientModeOn: true
    });
  }
  renderEditMenu(loggedinUser, post, deletePost, handleToggleEditMode) {
    if(!this.state.clientModeOn || !loggedinUser._id || loggedinUser!==post.postedBy) {
      return null;
    }
    return (
      <PostEditMenu
        postId={post._id}
        deletePost={deletePost}
        handleToggleEditMode={handleToggleEditMode}
      />
    );
  }
  render() {
    return (
      <div className="card-content">
        { this.state.clientModeOn && this.props.EditMenu }
        { this.props.Context }
        { this.state.clientModeOn &&
          <UserInfo
            userInfo={this.props.userInfo}
            editedOn={this.props.editedOn}
            postCreatedAt={this.props.post.createdAt}
          />
        }
        { this.props.editorContent &&
          <div className="draft-js-editor">
            <Editor
              editorState={convertToEditorState(this.props.editorContent)}
              readOnly
            />
          </div>
        }
      </div>
    );
  }
}

PostContent.propTypes = {
  EditMenu: PropTypes.object,
  editedOn: PropTypes.string,
  Context: PropTypes.object,
  post: PropTypes.object,
  userInfo: PropTypes.object,
  editorContent: PropTypes.string,
};
PostContent.defaultProps = {

};

export default PostContent;
