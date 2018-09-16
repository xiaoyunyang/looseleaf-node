import React from 'react';
import PropTypes from 'prop-types';
import appRoute from '../../../data/appRoute';
import { dateFormatted } from '../../../../lib/helpers';
import { contributorIds } from '../../../../lib/helpers';

class ContributorMeta extends React.Component {
  renderSomething(contributors, slug) {
    if(!contributors) return;

    const numContributing = contributorIds(contributors, 'contribute').length;
    const numWatching = contributorIds(contributors, 'watch').length;
    return (
      <div className="meta-info-inline">
        <span className="grey-text text-darken-1">
          <i className="fas fa-user-friends"/>
          {
            `${numContributing} contributing`
          }
        </span>
        <span className="grey-text text-darken-1">
          <i className="fas fa-eye"/>
          {`${numWatching} watching`}
        </span>
      </div>
    );
  }
  render() {
    return this.renderSomething(this.props.contributors, this.props.slug)
  }
}
export default class Card extends React.Component {

  render() {
    return (
      <div className="col s12 m12 l12">
        <div className="card-panel collection-project">
          <a href={appRoute('projectPage')(this.props.project.slug)}
          dangerouslySetInnerHTML={{ __html: this.props.project.title }} />
          {
            this.props.project.dueDate &&
            <div className="grey-text text-darken-1" style={{fontSize: 14}}>
              <i className="far fa-clock" />
              {dateFormatted(this.props.project.dueDate)}
            </div>
          }
          <p>{this.props.project.desc}</p>
          <ContributorMeta
            contributors={this.props.project.contributors}
            slug={this.props.project.slug}
          />
        </div>
      </div>
    );
  }
}
Card.propTypes = {
  project: PropTypes.object
}
