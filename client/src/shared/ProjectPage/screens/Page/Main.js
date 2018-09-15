import React from 'react';
import PropTypes from 'prop-types';
import TopNavUser from '../../../components/TopNavUser/Main';
import TopNavGuest from '../../../components/TopNavSimple';
import ProjectInfo from './ProjectInfo';
import Contributors from './Contributors';
import Feed from './Feed';
import Footer from '../../../components/Footer';
import { contributorIds } from '../../../../lib/helpers';

class Main extends React.Component {
  componentDidMount() {
    this.fetchContributors();
  }
  fetchContributors() {
    // NOTE: contributors is a dictionary which looks like this:
    // {
    //  {"5ac7f2b6cc78928a6f24a101": { watch: null, contribute: null },
    //  {"5ac7f2b6cc78928a6f24a102": { watch: "2018-09-09T01:50:11.781Z"}
    //  {"5ac7f2b6cc78928a6f24a103": { contribute: "2018-09-09T01:50:11.781Z"}
    // }
    // Where the key is the contributorId and value is either null (which means
    // the user was a contributor once but quit) or a date (which signifies the date
    // the user joined as a contributor)
    // We only want keys whose values are not null
    const contributors = this.props.projectInfo.contributors;

    const ids = contributorIds(contributors, 'contribute');
    // If there is no contributor, do not fetch because that would cause api to return every user
    if (ids.length > 0) {
      this.props.actions.getProjectContributors(ids);
    } else {
      this.props.actions.setProjectContributors([]);
    }
  }
  render() {
    const location = (typeof document !== 'undefined') ? document.location.pathname : undefined;
    return (
      <div>
        <div className="section-white">
          {
            this.props.user.loggedinUser ?
              <TopNavUser redirPath={location} user={this.props.user.loggedinUser} useExternLinks />
              :
              <TopNavGuest redirPath={location} useExternLinks />
          }
          <div className="container">
            <ProjectInfo
              projectInfo={this.props.projectInfo}
              loggedinUser={this.props.user.loggedinUser}
              actions={this.props.actions}
            />
            <Contributors contributors={this.props.contributors} />
            <Feed user={this.props.user.loggedinUser} projectId={this.props.projectInfo._id} />
          </div>
        </div>
        {
          !this.props.user.loggedinUser && <Footer />
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
  dueDate: '2018-07-14T04:44:56.361Z',
  postedBy: ''
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
