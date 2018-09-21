import React from 'react';
import PropTypes from 'prop-types';
import { Editor  } from 'draft-js';

import PostEditMenu from './PostEditMenu';
import Reactions from './Reactions';
import { convertToEditorStateWithDecorator as convertToEditorState } from './draftjsHelpers';
import { Context, UserInfo } from './PostParts';

class PostDisplay extends React.Component {
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
  render() {
    const {
      context,
      contextForUser,
      deletePost,
      editedOn,
      editorContent,
      handleToggleEditMode,
      handleToggleShowComment,
      showComment,
      commentNum,
      loggedinUser,
      post,
      userDisplayName,
      username,
      userPic
    } = this.props;
    return (
      editorContent &&
        <div className="card feed">
          <div className="card-content">
            {
              this.state.clientModeOn && loggedinUser && loggedinUser._id === post.postedBy?
                <PostEditMenu
                  postId={post._id}
                  deletePost={deletePost}
                  handleToggleEditMode={handleToggleEditMode}
                />
                :
                null
            }
            {
              context &&
              <Context context={context} contextForUser={contextForUser}/>
            }
            {
              this.state.clientModeOn &&
              <UserInfo
                userPic={userPic}
                username={username}
                userDisplayName={userDisplayName}
                editedOn={editedOn}
                post={post}
              />
            }
            <div className="draft-js-editor">
              <Editor
                editorState={convertToEditorState(editorContent)}
                readOnly
              />
            </div>
          </div>
          <div className="card-action">
            <Reactions
              post={post}
              loggedinUser={loggedinUser}
              handleToggleShowComment={handleToggleShowComment}
              showComment={showComment}
              commentNum={commentNum}
            />
          </div>
        </div>
    );
  }
}

PostDisplay.propTypes = {
  context: PropTypes.object,
  contextForUser: PropTypes.string,
  userDisplayName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  userPic: PropTypes.string.isRequired,
  editorContent: PropTypes.string,
  showComment: PropTypes.bool
};
PostDisplay.defaultProps = {
  context: null,
  editorContent: null,
  showComment: false
};

export default PostDisplay;
