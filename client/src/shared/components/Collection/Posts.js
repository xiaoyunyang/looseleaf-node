import React from 'react';
import PropTypes from 'prop-types';
import { getAppRoute } from '../../data/appRoutes';
import { dateFormatted } from '../../../lib/helpers';
import PostDisplay from '../Form/PostDisplay';
import { getApiData } from '../../../lib/helpers';
import { images } from '../../data/assetLinks';
import { apiLink } from '../../data/apiLinks';

const fetchUserById = (id) => {

}
class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDisplayName: 'Firstname Lastname',
      userPic: images.defaultUser,
      username: '',
    }
  }
  componentDidMount() {
    this.fetchUserInfo(this.props.userId);
  }
  fetchUserInfo(id) {
    const setApiData = data => this.setState({ 
      userDisplayName: data[0].displayName,
      userPic: data[0].picture,
      username: data[0].username
    });
    const link = apiLink.user(id);
    console.log(link)
    getApiData(link, setApiData);
  }
  render() {
    console.log(this.props.userId)
    return (
      <div key={`post-${this.props.id}`}>
        <PostDisplay
          userDisplayName={this.state.userDisplayName}
          userPic={this.state.userPic}
          username={this.state.username}
          editorContent={this.props.content}
        />
    </div>
    );
  }
}
const Posts = ({ posts }) => (
  <div>
    { posts &&
      posts.map(d => {
        return (
          <div key={`post-${d._id}`}>
            <Post
              userId={d.postedBy}
              content={d.content}
            />
          </div>
        );
      })
    }
  </div>
);
Posts.propTypes = {
  posts: PropTypes.array
};

export default Posts;
