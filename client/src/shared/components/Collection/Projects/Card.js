import React from 'react';
import PropTypes from 'prop-types';
import appRoute from '../../../data/appRoute';
import { dateFormatted } from '../../../../lib/helpers';


const contributorInfo = (contributors, projSlug) => {
  const num = Object.keys(contributors).length;
  const url = appRoute('projectPage')(projSlug);
  if (num === 0) {
    return <a href={url}>Be the first contribute <i className="fas fa-rocket"/></a>;
  } else if (num === 1) {
    return `${num} contributor`;
  } else if (num > 1) {
    return `${num} contributors`;
  }
  return null;
}

export default class Card extends React.Component {

  render() {
    return (
      <div className="col s12 m12 l12">
        <div className="card-panel collection-project">
          <a href={appRoute('projectPage')(this.props.project.slug)}
          dangerouslySetInnerHTML={{ __html: this.props.project.title }} />
          <p>{this.props.project.desc}</p>
          <div className="meta-info-inline">
            {
              this.props.project.dueDate &&
              <span className="grey-text text-darken-1">
                <i className="far fa-clock" />
                {dateFormatted(this.props.project.dueDate)}
              </span>
            }
            {
              this.props.project.contributors &&
              <span className="grey-text text-darken-1">
                <i className="fas fa-user-friends"/>
                {contributorInfo(this.props.project.contributors, this.props.project.slug)}
              </span>
            }
          </div>
        </div>
      </div>
    );
  }
}
Card.propTypes = {
  project: PropTypes.object
}
