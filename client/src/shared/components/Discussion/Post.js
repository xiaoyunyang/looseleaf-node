import React from 'react';
import PropTypes from 'prop-types';
import NewPost from './NewPost';
import Comments from './Comments';
import Reactions from './Reactions';
import PostEditMenu from './PostEditMenu';
import { image } from '../../data/assetLinks';
import { apiLink } from '../../data/apiLinks';
import appRoute from '../../data/appRoute'
import { getApiData, postToApiData } from '../../../lib/helpers';
import { Context } from './PostParts';
import { communityName } from '../Collection/Communities/lib';
import { newPlugins } from './draftjsHelpers';
import PostContent from './PostContent';

const { plugins, inlineToolbarPlugin } = newPlugins();
const { InlineToolbar } = inlineToolbarPlugin;

// TODO: For consistency, change the name of one of the props for this component from
// loggedInAs to loggedinUser
class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComment: this.props.showComment,
      userDisplayName: 'Firstname Lastname',
      userPic: image.defaultUser,
      username: '',
      commentNum: this.props.post.comments.length,
      editMode: false,
      editedOn: this.props.post.editedOn,
      editorContent: this.props.post.content,
      postContext: { link: '#', name: 'Project or community' },
      contextForUser: 'because you are a contributor',
    };
    this.handleToggleEditMode = this.handleToggleEditMode.bind(this);
    this.handleToggleShowComment = this.handleToggleShowComment.bind(this);
    this.handleEditPost = this.handleEditPost.bind(this);
  }
  componentDidMount() {
    this.fetchUserInfo(this.props.post.postedBy);
    this.updateContext(this.props.showContext);
  }
  updateContext(showContext) {
    const projectId = this.props.post.context.project;
    const communitySlug = this.props.post.context.community;
    const postId = this.props.post.context.post;

    let link, name;
    if (communitySlug) {
      link = appRoute('communityHome', true)(communitySlug);
      name = communityName(communitySlug);
      this.setState({
        postContext: { link: link, name: name },
        contextForUser: 'in which you are a member'
      });
    } else if (projectId) {
      this.fetchProjectInfo(projectId);
    } else if (postId) {
      link = appRoute('postPage', true)(postId);
      name = 'this post'
      this.setState({
        postContext: { link: link, name: name },
        contextForUser: 'in which you replied'
      });
    }
  }
  fetchProjectInfo(projectId) {
    const url = apiLink.projectById(projectId);
    const setApiData = data => {
      const project = data[0];
      const link = appRoute('projectPage', true)(project.slug);
      const name = project.title;
      this.setState({
        postContext: { link, name },
        contextForUser: 'for which you are a contributor' // TODO: not necessarily. I load posts from followers/following of the user also. Can't tell.
      });
    }
    getApiData(url, setApiData)
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
        editorContent: msg.content,
        editedOn: msg.editedOn
      });
    };
    postToApiData(url, data , cbFailure, cbSuccess);
  }
  handleToggleShowComment() {
    const toggledShowComment = !this.state.showComment;
    this.setState({
      showComment: toggledShowComment
    });
    return toggledShowComment;
  }
  updateParentPostCommentsNum(commentNumUpdated) {
    this.setState({
      commentNum: commentNumUpdated
    });
  }
  createContext() {
    const contextForUser = this.props.showContextForUser ? this.state.contextForUser : null;
    const context = this.props.showContext ? this.state.postContext : null;
    return context && <Context context={context} contextForUser={contextForUser}/>
  }
  renderCardAction() {
    return (
      <div className="card-action">
        <Reactions
          post={this.props.post}
          loggedinUser={this.props.loggedinUser}
          handleToggleShowComment={this.handleToggleShowComment}
          showComment={this.state.showComment}
          commentNum={this.state.commentNum}
        />
      </div>
    )
  }
  createEditMenu(loggedinUser, post) {
    if(!loggedinUser || loggedinUser._id !== post.postedBy) {
      return null;
    }
    return (
      <PostEditMenu
        postId={post._id}
        deletePost={this.props.deletePost}
        handleToggleEditMode={this.handleToggleEditMode}
      />
    );
  }
  renderPost() {
    const { userPic, username, userDisplayName} = this.state;
    const userInfo={ userPic, username, userDisplayName };
    const Context = this.createContext();
    const EditMenu = this.createEditMenu(this.props.loggedinUser, this.props.post);
    return (
      <div className="card feed">
        <PostContent
          editorContent={this.state.editorContent}
          editedOn={this.state.editedOn}
          loggedinUser={this.props.loggedinUser}
          post={this.props.post}
          userInfo={userInfo}
          deletePost={this.props.deletePost}
          handleToggleEditMode={this.handleToggleShowComment}
          Context={Context}
          EditMenu={EditMenu}
        />
        {this.renderCardAction()}
      </div>
    );
  }
  render() {
    return (
      <div key={`post-${this.props.post._id}`}>
        { this.state.editMode &&
          <NewPost
            editorContent={this.state.editorContent}
            handleToggleEditMode={this.handleToggleEditMode}
            handlePost={editedContent => this.handleEditPost(editedContent, this.props.post._id) }
            InlineToolbar ={<InlineToolbar/>}
            placeholder='Write something.'
            plugins={plugins}
            userDisplayName={this.state.userDisplayName}
            userPic={this.state.userPic}
          />
        }
        { !this.state.editMode && this.renderPost() }
        { this.state.showComment &&
          <Comments
            postId={this.props.post._id}
            loggedinUser={this.props.loggedinUser}
            updateParentPostCommentsNum={updatedNum => this.updateParentPostCommentsNum.bind(this, updatedNum)}
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
Post.propTypes = {
  showComment: PropTypes.bool,
  deletePost: PropTypes.func
}
Post.defaultProps = {
  showComment: false // important
}

export default Post;
