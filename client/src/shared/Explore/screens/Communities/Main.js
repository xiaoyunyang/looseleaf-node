import React from 'react';
import TopNavUser from '../../../components/TopNavUser/Main';
import TopNavGuest from '../../../components/TopNavSimple';
import Footer from '../../../components/Footer';
import ExploreBlock from '../../../components/Collection/Communities/ExploreBlock';

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
            <h3>Explore Communities</h3>
            <ExploreBlock version='long' />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
