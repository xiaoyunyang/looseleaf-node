import React from 'react';
// import PropTypes from 'prop-types';
import TopNavUser from '../../../components/TopNavUser/Main';
import TopNavGuest from '../../../components/TopNavSimple';
import Post from '../../../components/Discussion/Post';
import Footer from '../../../components/Footer';

class Main extends React.Component {
  deletePost(postId) {
    window.location = '/';
  }
  render() {
    const location = (typeof document !== 'undefined') ? document.location.pathname : undefined;
    return (
      <div>
        <div className="section-white" style={{minHeight: '100vh'}}>
          {
            this.props.user.loggedinUser ?
              <TopNavUser redirPath={location} user={this.props.user.loggedinUser} useExternLinks />
              :
              <TopNavGuest redirPath={location} useExternLinks />
          }
          <div className="container">
            <h3>Post</h3>
            <Post
              showContext={true}
              showContextForUser={false}
              post={this.props.post.main}
              loggedinUser={this.props.user.loggedinUser}
              deletePost={this.deletePost.bind(this)}
              showComment={true}
            />
          </div>
        </div>
        {
          !this.props.user.loggedinUser && <Footer />
        }
      </div>
    );
  }
}

export default Main;
