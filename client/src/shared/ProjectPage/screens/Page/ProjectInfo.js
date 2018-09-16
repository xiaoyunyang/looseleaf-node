import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { dateFormatted, getApiData, contributorIds, postToApiData } from '../../../../lib/helpers';
import { apiLink } from '../../../data/apiLinks';
import appRoute from '../../../data/appRoute';
import Communities from '../../../components/Collection/Communities';
import { badgeIcon } from '../../../components/Collection/Projects/Badge';

export default class ProjectInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }
  componentDidMount() {
    this.fetchProjectCreator();
  }
  fetchProjectCreator() {
    const url = apiLink.userById(this.props.projectInfo.postedBy);
    const setApiData = data => this.setState({ user: data[0] });
    getApiData(url, setApiData);
  }
  renderProjectCreator(user) {
    return user && (
      <p style={{marginBottom: 0, marginTop: -10}}>
        <span>Posted by </span>
        <a href={appRoute('userProfile', true)(user.username)}>{user.displayName}</a>
      </p>
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
  handleCtaClick(userId, projectId, currContributors, action) {
    const updatedContributors = Object.assign({}, currContributors);
    const entry = Object.assign({}, currContributors[userId]);

    if (action === 'contribute') {
      // Add userId to updatedContributorIds
      entry.contribute = 'dc'; // dc stands for don't care.
    } else if (action === 'un-contribute') {
      // remove userId from updatedContributorIds
      entry.contribute = null;
    } else if (action === 'watch') {
      entry.watch = 'dc';
    } else if (action === 'un-watch') {
      entry.watch = null;
    }

    updatedContributors[userId] = entry;

    const url = apiLink.userProjects(userId, projectId, action);
    const data = {formFields: null};
    const cbFailure = () => {};
    const cbSuccess = (status, msg) =>  {
      this.props.actions.getProjectPageData(msg.projectSlug, msg.userUsername);
      const ids = contributorIds(updatedContributors, 'contribute');
      if (ids.length > 0) {
        this.props.actions.getProjectContributors(ids);
      } else {
        this.props.actions.setProjectContributors([]);
      }
    }
    postToApiData(url, data, cbFailure, cbSuccess);
  }
  renderProjectContributorStatus(loggedinUser, projectInfo) {
    const contributors = projectInfo.contributors;
    const projectId = projectInfo._id;
    const userId = loggedinUser._id.toString();

    return (
      <div className="row" style={{marginTop: 20}}>
        { contributors[userId] && contributors[userId].watch ?
          <p className="col s12 m12 l12">
            {`You are a watcher of this project. `}
            <span
              className="span-anchor"
              onClick={this.handleCtaClick.bind(this, userId, projectId, projectInfo.contributors, 'un-watch')}
            >
              Unwatch
            </span>
          </p>
          :
          <div className="col">
            <button
              className="btn teal teal-text lighten-5"
              onClick={this.handleCtaClick.bind(this, userId, projectId, projectInfo.contributors, 'watch')}
            >
              Watch
            </button>
          </div>
        }
        { contributors[userId] && contributors[userId].contribute ?
          <p className="col s12 m12 l12">
            {`You are a contributor of this project since ${dateFormatted(contributors[userId].contribute)}. `}
            <span
              className="span-anchor"
              onClick={this.handleCtaClick.bind(this, userId, projectId, projectInfo.contributors, 'un-contribute')}
            >
              Unjoin
            </span>
          </p>
          :
          <div className="col">
            <button
              className="btn teal lighten-1"
              onClick={this.handleCtaClick.bind(this, userId, projectId, projectInfo.contributors, 'contribute')}
              >
              Contribute
            </button>
          </div>
        }

      </div>
    );
  }
  renderDesc(desc) {
    if (desc === '') return;
    return (
      <div>
        <h6>Description:</h6>
        <p style={{marginTop: -3}}>{desc}</p>
      </div>
    )
  }
  renderCreatorInfo({ about, mission }) {
    if (about === '' && mission === '') return;
    return (
      <div>
        <h6>About the Project Creator:</h6>
        { about !== '' &&
          <p style={{marginTop: -3}}>{about}</p>
        }
        {
          mission !== '' &&
          <p>
            <span style={{marginRight: 4}}>Mission:</span>{mission}
          </p>
        }
      </div>
    )
  }
  render() {
    const {
      title,
      desc,
      dueDate,
      createdAt,
      postedBy,
      creator,
      communities,
    } = this.props.projectInfo;
    return (
      <div id="project-info" className="col s12 m12 l12">
        <div className="card-panel white">
          <div className="hero-info">
            {
              this.props.loggedinUser &&
              this.renderEditProjectLink(this.props.loggedinUser._id.toString(), postedBy)
            }
            <h4>{title}</h4>
            {this.renderProjectCreator(this.state.user)}
            <p style={{marginTop: 0}}>
              {`Created On: ${dateFormatted(createdAt)}`}
            </p>
            {
              this.renderDesc(desc)
            }
            {
              this.renderCreatorInfo(creator)
            }
            <div style={{maxWidth: 500}}>
              <Communities
                cs={communities}
                altern={<div style={{fontWeight: 350}}>{'This project is not associated with a community.'}</div>}
                showAltern
                hasIcon
              />
            </div>
            {
              dueDate &&  <p>{`Due Date: ${dateFormatted(dueDate)}`}</p>
            }
            <span className="grey-text text-darken-2">
              <i className={badgeIcon('watcher').className} style={{marginRight: 5}}/>
              <a href='#'>{`${contributorIds(this.props.projectInfo.contributors, 'watch').length} watching`}</a> this project
            </span>
          </div>
          {
            this.props.loggedinUser &&
            this.renderProjectContributorStatus(
              this.props.loggedinUser,
              this.props.projectInfo
            )
          }
        </div>
      </div>
    );
  }
}

ProjectInfo.propTypes = {
  projectInfo: PropTypes.object
}
