import React from 'react';
import { getApiData } from '../../../../lib/helpers';
import { apiLink } from '../../../data/apiLinks';
import Posts from '../../../components/Collection/Posts';

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
  render() {
    return (
      <div className="container">
        <div className="row">
          <h3>Posts</h3>
          <Posts
            posts={this.state.posts}
            noPostDisp='There are no posts by this user'
          />
        </div>
      </div>
    );
  }
}
