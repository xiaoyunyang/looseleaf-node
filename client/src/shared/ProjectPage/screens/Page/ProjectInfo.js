import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { dateFormatted, getApiData } from '../../../../lib/helpers';
import { apiLink } from '../../../data/apiLinks';
import appRoute from '../../../data/appRoute';

export default class ProjectInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }
  componentDidMount() {
    const url = apiLink.userById(this.props.projectInfo.postedBy);
    const setApiData = data => this.setState({ user: data[0] });
    getApiData(url, setApiData);
  }
  renderProjectCreator(user) {
    return user && (
      <div>
        <span>Posted by </span>
        <a href={`/@${user.username}`}>{user.displayName}</a>
      </div>
    );
  }
  renderEditProjectLink(loggedinAsId, projectCreatorId) {
    // NOTE: server-rendered code will see the id as an object while client-rendered code
    // will see the id as a string. Therefore, always convert the ids to string to prevent
    // server/client rendered DOM disagreeing.
    return (
      (loggedinAsId.toString() === projectCreatorId.toString()) &&
      <div className="right">
        <Link to={appRoute('editProject')(this.props.projectInfo.slug)}>
          Edit Project Info
        </Link>
      </div>
    );
  }
  render() {
    const {
      title,
      desc,
      dueDate,
      createdAt,
      postedBy
    } = this.props.projectInfo;

    return (
      <div id="project-info" className="col s12 m12 l12">
        <div className="card-panel white">
          {
            this.props.loggedinUser &&
            this.renderEditProjectLink(this.props.loggedinUser._id, postedBy)
          }
          <h4 dangerouslySetInnerHTML={{ __html: title }} />
          {this.renderProjectCreator(this.state.user)}
          <p dangerouslySetInnerHTML={{ __html: desc }} />
          <p>{`Created On: ${dateFormatted(createdAt)}`}</p>
          <p>{`Due Date: ${dateFormatted(dueDate)}`}</p>
          <div className="row">
            <div className="col">
              <a className="waves-effect waves-light btn teal teal-text lighten-5">Watch</a>
            </div>
            <div className="col">
              <a className="waves-effect waves-light btn teal lighten-1">Contribute</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectInfo.propTypes = {
  projectInfo: PropTypes.object
}
