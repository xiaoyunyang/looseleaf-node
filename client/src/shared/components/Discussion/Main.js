import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Posts from './Posts';
import PostEditor from './PostEditor';
import { apiLink } from '../../data/apiLinks';
import { getApiData } from '../../../lib/helpers';
import { newPlugins } from './draftjsHelpers';
const { plugins, inlineToolbarPlugin } = newPlugins();
const { InlineToolbar } = inlineToolbarPlugin;

export default class Discussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: null,
      posts: null
    };
  }
  componentWillMount() {
    this.fetchPosts();
  }
  fetchPosts() {
    const context = this.props.context;
    const findBy = context === 'project' ? this.props.projectId : this.props.communitySlug;
    const link = apiLink.postsByContext(context, findBy);
    const setApiData = data => this.setState({ posts: data });
    getApiData(link, setApiData);
  }

  // Returns True if successful post. False Otherwise.
  handlePost(d) {
    // The d received here are in the format that can be saved to the DB
    this.setState({
      editorContent: d
    });
    const userId = this.props.loggedinUser._id;
    const content = d;
    const context = {
      project: this.props.projectId,
      community: this.props.communitySlug
    }

    // TODO: Move this to helper file
    axios.post(apiLink.posts, { content, userId, context })
      .then(res => {
        if (res.statusText === 'error') {
          // If there's error, do something
        } else if (res.statusText === 'OK') {
          this.fetchPosts();
        }
      // Perform action based on response, such as flashing error notif
      })
      .catch((error) => {
        console.log(error);
       //Perform action based on error
      });
  }
  // TODO: create addPost which gets passed down to PostEditor
  deletePost(postId) {
    const newPosts = this.state.posts.filter(d => {
      return d._id !== postId;
    });
    this.setState({ posts: newPosts });
  }

  render() {
    return (
      <div>
        {
          this.props.loggedinUser &&
            <PostEditor
              handlePost={d => this.handlePost(d)}
              InlineToolbar ={<InlineToolbar/>}
              placeholder={this.props.newPostPlaceholder}
              plugins={plugins}
              userDisplayName={this.props.loggedinUser.displayName}
              userPic={this.props.loggedinUser.picture}
            />
        }
        <Posts
          posts={this.state.posts}
          loggedinAs={this.props.loggedinUser}
          deletePost={this.deletePost.bind(this)}
        />
      </div>
    );
  }
}
// Example:
// context = {project: <projectId>, community: <communityName>}
//
// newPostPlaceholder:
// "Post an announcement, question, or insight to this community.
// "Post an update, question, or clarification to this project."
Discussion.propTypes = {
  loggedinUser: PropTypes.object,
  newPostPlaceholder: PropTypes.string,
  communitySlug: PropTypes.string,
  projectId: PropTypes.string,
  context: PropTypes.string.isRequired
};
Discussion.defaultProps = {
  projectId: null,
  communitySlug: null,
}
