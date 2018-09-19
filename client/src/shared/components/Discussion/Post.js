import React from 'react';
// import PropTypes from 'prop-types';
import PostDisplay from './PostDisplay';
import PostEditor from './PostEditor';
import { image } from '../../data/assetLinks';
import { apiLink } from '../../data/apiLinks';
import appRoute from '../../data/appRoute'
import { getApiData, postToApiData } from '../../../lib/helpers';
import { communityName } from '../Collection/Communities/lib';
import { newPlugins } from './draftjsHelpers';

const { plugins, inlineToolbarPlugin } = newPlugins();
const { InlineToolbar } = inlineToolbarPlugin;

// TODO: For consistency, change the name of one of the props for this component from
// loggedInAs to loggedinUser
class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDisplayName: 'Firstname Lastname',
      userPic: image.defaultUser,
      username: '',
      editMode: false,
      editedOn: this.props.post.editedOn,
      editorContent: this.props.post.content,
      postContext: { link: '#', name: 'Project or community' }
    };
  }
  componentDidMount() {
    this.fetchUserInfo(this.props.post.postedBy);
    this.updateContext(this.props.showContext);
  }
  updateContext(showContext) {
    const projectId = this.props.post.context.project;
    const communitySlug = this.props.post.context.community;

    let link, name;
    if (communitySlug) {
      link = appRoute('communityHome', true)(communitySlug);
      name = communityName(communitySlug);
      this.setState({
        postContext: { link: link, name: name }
      });
    } else if (projectId) {
      this.fetchProjectInfo(projectId);
    }
  }
  fetchProjectInfo(projectId) {
    const url = apiLink.projectById(projectId);
    const setApiData = data => {
      const project = data[0];
      const link = appRoute('projectPage', true)(project.slug);
      const name = project.title;
      this.setState({
        postContext: { link, name }
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
  render() {
    return (
      <div key={`post-${this.props.post._id}`}>
        { this.state.editMode ?
          <PostEditor
            editorContent={this.state.editorContent}
            handleToggleEditMode={this.handleToggleEditMode.bind(this)}
            handlePost={editedContent => this.handleEditPost(editedContent, this.props.post._id) }
            InlineToolbar ={<InlineToolbar/>}
            placeholder='Write something.'
            plugins={plugins}
            userDisplayName={this.state.userDisplayName}
            userPic={this.state.userPic}
          />
          :
          <PostDisplay
            context={this.props.showContext ? this.state.postContext : null}
            deletePost={this.props.deletePost}
            editedOn={this.state.editedOn}
            editorContent={this.state.editorContent}
            handleToggleEditMode={this.handleToggleEditMode.bind(this)}
            loggedinUser={this.props.loggedinAs}
            post={this.props.post}
            userDisplayName={this.state.userDisplayName}
            userPic={this.state.userPic}
            username={this.state.username}
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
