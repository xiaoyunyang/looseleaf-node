import React from 'react';
import axios from 'axios';
import TopNav from '../TopNav';
import { page } from '../routes';
import Posts from '../../components/Collection/Posts';
import { apiLink } from '../../data/apiLinks';
import { getApiData } from '../../../lib/helpers';

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
    const setApiData = data => this.setState({ posts: data });
    getApiData(apiLink.posts, setApiData);
  }
  render() {
    return (
      <div className="section-white">
        <TopNav route={this.props.route} user={this.props.user} community={this.props.community} />
        <div className="community-page container">
          <div className="row">
            <div id={page(this.props.community).two.slug} className="col s12 m12 l12">
              <h3>Announcements</h3>
              <Posts
                posts={this.state.posts}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
