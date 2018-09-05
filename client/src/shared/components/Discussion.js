import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Posts from './Collection/Posts';
import PostEditor from './Form/PostEditor';
import { apiLink } from '../data/apiLinks';
import { getApiData } from '../../lib/helpers';

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
    const userId = this.props.user._id;
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
          this.props.user &&
            <PostEditor
              handlePost={d => this.handlePost(d)}
              userDisplayName={this.props.user.displayName}
              userPic={this.props.user.picture}
              placeholder={this.props.newPostPlaceholder}
            />
        }
        <Posts
          posts={this.state.posts}
          loggedInAs={this.props.user}
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
  user: PropTypes.object,
  newPostPlaceholder: PropTypes.string,
  communitySlug: PropTypes.string,
  projectId: PropTypes.object,
  context: PropTypes.string.isRequired
};
Discussion.defaultProps = {
  projectId: null,
  communitySlug: null,
}
