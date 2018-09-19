import React from 'react';
import PropTypes from 'prop-types';
import { CompositeDecorator, convertFromRaw, Editor, EditorState } from 'draft-js';
import { dateFormatted } from '../../../lib/helpers';
import appRoute from '../../data/appRoute';
import PostEditMenu from './PostEditMenu';
import Reactions from './Reactions';

// Following code based on:
// https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/link/link.html
const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a rel="nofollow noreferrer" href={url} target="_blank">
      {props.children}
    </a>
  );
};

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

const decorator = new CompositeDecorator([{
  strategy: findLinkEntities,
  component: Link
}]);

// TODO: import the below code from draftjsHelpers
const convertToEditorState = (editorContent) => {
  const content = convertFromRaw(JSON.parse(editorContent));
  const editorState = EditorState.createWithContent(content, decorator);
  return editorState;
};

const PostUserInfo = ({ userPic, username, userDisplayName, editedOn, post }) => (
  <div className="row feed-user">
    <div className="col">
      <img className="circle" src={userPic} alt="" />
    </div>
    <div className="col" style={{marginLeft: -18}}>
      <span>
        <a href={appRoute('userProfile', true)(username)}>{userDisplayName}</a>
      </span>
      <p style={{paddingLeft: 15, fontSize: 14}}>
        {dateFormatted(post.createdAt)}
      </p>
    </div>
    {
      editedOn &&
      <div className="col">
        <p className="post-edited-label">· Edited</p>
      </div>
    }
  </div>
);
const PostContext = ({ context, contextForUser }) => (
  <div className="row post-context">
    <span>Posted under </span>
    <span><a href={context.link}>{context.name}</a></span>
    <div>{contextForUser}</div>
  </div>
);

const PostDisplay = ({
  context,
  contextForUser,
  deletePost,
  editedOn,
  editorContent,
  handleToggleEditMode,
  handleToggleShowComment,
  loggedinUser,
  post,
  userDisplayName,
  username,
  userPic
}) => (
  editorContent &&
    <div className="card feed">
      <div className="card-content">
        {
          loggedinUser && loggedinUser._id === post.postedBy ?
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
          <PostContext context={context} contextForUser={contextForUser}/>
        }
        <PostUserInfo
          userPic={userPic}
          username={username}
          userDisplayName={userDisplayName}
          editedOn={editedOn}
          post={post}
        />
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
        />
      </div>
    </div>
);

PostDisplay.propTypes = {
  context: PropTypes.object,
  contextForUser: PropTypes.string,
  userDisplayName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  userPic: PropTypes.string.isRequired,
  editorContent: PropTypes.string
};
PostDisplay.defaultProps = {
  context: null,
  editorContent: null
};

export default PostDisplay;
