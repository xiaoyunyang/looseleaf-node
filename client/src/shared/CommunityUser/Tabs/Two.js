import React from 'react';
import axios from 'axios';
import TopNav from '../TopNav';
import { page } from '../routes';
import PostEditor from '../../components/Form/PostEditor';
import Posts from '../../components/Collection/Posts';
import PostDisplay from '../../components/Form/PostDisplay';
import { apiLink } from '../../data/apiLinks';
import { getApiData } from '../../../lib/helpers';

export default class Two extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: null,
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
  // Returns True if successful post. False Otherwise.
  handlePost(d) {
    // The d received here are in the format that can be saved to the DB
    this.setState({
      editorContent: d
    });
    const userId = this.props.user._id;
    const content = d;
    const context = {project: null, community: this.props.community.name}
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
  render() {
    return (
      <div className="section-white">
        <TopNav route={this.props.route} user={this.props.user} community={this.props.community} />
        <div className="community-page container">
          <div className="row">
            <div id={page(this.props.community).two.slug} className="col s12 m12 l12">
              <h3>Announcements</h3>
              <PostEditor
                handlePost={d => this.handlePost(d)}
                userDisplayName={this.props.user.displayName}
                userPic={this.props.user.picture}
                placeholder="Post an announcement to this community."
              />

              {
                // this.state.posts &&
                // this.state.posts.map(d =>
                //   <div key={`post-${d._id}`}>
                //     <PostDisplay
                //       userDisplayName={this.props.user.displayName}
                //       userPic={this.props.user.picture}
                //       editorContent={d.content}
                //     />
                //   </div>
                // )
              }
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
