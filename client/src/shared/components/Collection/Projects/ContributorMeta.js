import React from 'react';
import PropType from 'prop-types';
import { contributorIds } from '../../../../lib/helpers';
import { Badge, badgeIcon }  from './Badge';


const getUserContribution = (contributors, userId) => {
  const entry = contributors[userId];
  if (!entry) return { watching: false, contributing: false };
  const watching = entry.watch ? true : false;
  const contributing = entry.contribute ? true : false;
  return { watching, contributing };
}

export default class ContributorMeta extends React.Component {
  renderMeta4Project(contributors, slug) {
    if(!contributors) return;

    const numContributing = contributorIds(contributors, 'contribute').length;
    const numWatching = contributorIds(contributors, 'watch').length;
    return (
      <div className="meta-info-inline">
        <span className="grey-text text-darken-1">
          <i className={badgeIcon('contributor').className} />
          {
            `${numContributing} contributing`
          }
        </span>
        <span className="grey-text text-darken-1">
          <i className={badgeIcon('contributor').className} />
          {`${numWatching} watching`}
        </span>
      </div>
    );
  }
  renderMeta4User(contributors, userId) {
    const { watching, contributing } = getUserContribution(contributors, userId);
    return (
      <div className="meta-badges-inline right-align">
        {
          this.props.projectCreator === userId &&
          <Badge
            type='creator'
            tooltipLabel={`${this.props.userFirstname} created this project`}
            customStyle={{marginTop: -2, paddingRight: 3}}
          />
        }
        {
          watching &&
          <Badge
            type='watcher'
            tooltipLabel={`${this.props.userFirstname} is watching this project`}
          />
        }
        {
          contributing &&
          <Badge
            type='contributor'
            tooltipLabel={`${this.props.userFirstname} is a contributor to this project`}
            customStyle={{marginLeft: 1}}
          />
        }
      </div>
    );
  }
  render() {
    return (
      <div>
      {
        this.props.context === 'project' &&
        this.renderMeta4Project(this.props.contributors, this.props.slug)
      }
      {
        this.props.context === 'user' &&
        this.renderMeta4User(this.props.contributors, this.props.userId)
      }
      </div>
    );

  }
}
ContributorMeta.propTypes = {
  contributors: PropType.object.isRequired,
  context: PropType.object.string,
  slug: PropType.object.string,
  userId: PropType.string.isRequired,
  projectCreator: PropType.string.isRequired,
  userFirstname: PropType.string
}
ContributorMeta.defaultProps = {
  userFirstname: 'user'
}
