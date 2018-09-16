import React from 'react';
import PropTypes from 'prop-types';
import Posts from './Posts';
import PostEditor from './PostEditor';
import { apiLink } from '../../data/apiLinks';
import { getApiData, postToApiData } from '../../../lib/helpers';
import { newPlugins } from './draftjsHelpers';
const { plugins, inlineToolbarPlugin } = newPlugins();
const { InlineToolbar } = inlineToolbarPlugin;

export default class Discussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: null,
      posts: [],
      isLoading: true,
      page: 1,
      endOfPage: false
    };
    this.loadMorePosts = this.loadMorePosts.bind(this);
  }
  componentDidMount() {
    this.fetchPosts(this.state.page);
  }
  fetchPosts(page) {
    const context = this.props.context;
    const findBy = context => {
      switch (context) {
        case 'project': return this.props.projectId;
        case 'community': return this.props.communitySlug;
        case 'user': return this.props.userId;
        default: return;
      }
    };
    const link = apiLink.postsByContext(context, findBy(context), page);
    const setApiData = data => {
      const oldPosts = this.state.posts;
      this.setState({
        posts: oldPosts.concat(data),
        isLoading: false
      });

      if (data.length < 5) { // TODO: 5 is a magic number
        this.setState({
          endOfPage: true
        });
      }
    }
    getApiData(link, setApiData);
  }
  loadMorePosts() {
    const nextPage = this.state.page + 1;
    this.fetchPosts(nextPage);
    this.setState({
      page: nextPage
    });
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
    const postUrl = apiLink.posts;
    const data = { content, userId, context };

    const cbFailure = (status, msg) => {};
    const cbSucess = (status, msg) => {
      const oldPosts = this.state.posts;
      const updatedPosts = [msg].concat(oldPosts)
      this.setState({ posts: updatedPosts})
    }
    postToApiData(postUrl, data, cbFailure, cbSucess);
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
          this.props.loggedinUser && !this.props.readOnly &&
            <PostEditor
              handlePost={d => this.handlePost(d)}
              InlineToolbar ={<InlineToolbar/>}
              placeholder={this.props.newPostPlaceholder}
              plugins={plugins}
              userDisplayName={this.props.loggedinUser.displayName}
              userPic={this.props.loggedinUser.picture}
            />
        }
        {
          this.state.isLoading ?
          <p>Loading...</p>
          :
          <div>
            <Posts
              posts={this.state.posts}
              loggedinAs={this.props.loggedinUser}
              deletePost={this.deletePost.bind(this)}
            />
            {
              this.state.posts.length > 0 && !this.state.endOfPage &&
              <div className="row center">
                <a
                  className="btn col s8 m4 l4 offset-s2 offset-m4 offset-l4"
                  onClick={this.loadMorePosts}
                >
                  Load More
                </a>
              </div>
            }
          </div>
        }
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
  context: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
};
Discussion.defaultProps = {
  projectId: null,
  communitySlug: null,
  readOnly: true,
  userId: ''
}
