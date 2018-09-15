import React from 'react';
import { getApiData } from '../../../lib/helpers';
import { apiLink } from '../../data/apiLinks';
import Posts from '../Discussion/Posts';

export default class Two extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null
    };
  }
  componentDidMount() {
    this.fetchPosts();
  }
  fetchPosts() {
    const url = apiLink.postsByUserId(this.props.userId);
    const setApiData = data => this.setState({ posts: data });
    getApiData(url, setApiData);
  }
  deletePost(postId) {
    const newPosts = this.state.posts.filter(d => {
      return d._id !== postId;
    });
    this.setState({ posts: newPosts });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <h3>Posts</h3>
          <Posts
            posts={this.state.posts}
            loggedinAs={this.props.loggedinAs}
            noPostDisp="This user has no posts."
            deletePost={this.deletePost.bind(this)}
          />
        </div>
      </div>
    );
  }
}
