import React from 'react';
import PropTypes from 'prop-types';
import TopNavUser from '../../components/TopNavUser/Main';
import TopNavGuest from '../../components/TopNavSimple';
import ProjectInfo from './ProjectInfo';
import Contributors from './Contributors';
import Feed from './Feed';
import Footer from '../../components/Footer';

class Main extends React.Component {
  render() {
    const location = (typeof document !== 'undefined') ? document.location.pathname : undefined;
    return (
      <div>
        <div className="section-white">
          {
            this.props.user.info ?
              <TopNavUser redirPath={location} user={this.props.user.info} useExternLinks />
              :
              <TopNavGuest redirPath={location} useExternLinks />
          }
          <div className="container">
            <ProjectInfo projectInfo={this.props.projectInfo} />
            <Contributors contributors={this.props.contributors} />
            <Feed user={this.props.user} projectId={this.props.projectInfo._id} />
          </div>
        </div>
        {
          !this.props.user.info && <Footer />
        }
      </div>
    );
  }
}

// TODO and NOTE: Make sure the default values match the redux init state values.
// Otherwise, there's going to be a warning about how server and client do not match.
const defaultProjectInfo = {
  title: 'placeholder title',
  desc: 'placeholder desc',
  dueDate: '2018-07-14T04:44:56.361Z'
}

Main.propTypes = {
  projectInfo: PropTypes.object,
  contributors: PropTypes.array,
  user: PropTypes.object,
}

Main.defaultProps = {
  projectInfo: defaultProjectInfo,
  contributors: [],
};
export default Main;
