import React from 'react';
import PropTypes from 'prop-types';
import appRoute from '../../../data/appRoute';
import { dateFormatted } from '../../../../lib/helpers';
import ContributorMeta from './ContributorMeta';

export default class Card extends React.Component {

  render() {
    return (
      <div className="col s12 m12 l12">
        <div className="card-panel collection-project">
          <a href={appRoute('projectPage')(this.props.project.slug)}>
            {this.props.project.title}
          </a>
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
            context={this.props.context}
            projectCreator={this.props.projectCreator}
            userId={this.props.userId}
          />
        </div>
      </div>
    );
  }
}
Card.propTypes = {
  project: PropTypes.object,
  context: PropTypes.string,
  userId: PropTypes.string
}
// Context may be 'project' or 'user'
Card.defaultProps = {
  context: 'project'
}
