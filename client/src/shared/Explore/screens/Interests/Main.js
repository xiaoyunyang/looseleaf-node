import React from 'react';
import TopNavUser from '../../../components/TopNavUser/Main';
import TopNavGuest from '../../../components/TopNavSimple';
import Footer from '../../../components/Footer';

// This is an app for users to explore projects, jobs, and people who match their Interests
// and career goals
export default class extends React.Component {
  render() {
    const location = (typeof document !== 'undefined') ? document.location.pathname : undefined;
    return (
      <div>
        <div className="section-white" style={{ minHeight: '55vh'}}>
          {
            this.props.user.loggedinUser ?
              <TopNavUser redirPath={location} user={this.props.user.loggedinUser} useExternLinks />
              :
              <TopNavGuest redirPath={location} useExternLinks />
          }
          <div className="container">
            <h3>Explore Interests</h3>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
