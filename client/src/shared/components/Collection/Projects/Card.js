import React from 'react';
import PropTypes from 'prop-types';
import appRoute from '../../../data/appRoute';
import { dateFormatted } from '../../../../lib/helpers';
import ContributorMeta from './ContributorMeta';

const Card = ({
  project, context, projectCreator, userId, userFirstname
}) => (
  <div className="col s12 m12 l12">
    <div className="card-panel collection-project">
      <a href={appRoute('projectPage', true)(project.slug)}>
        {project.title}
      </a>
      {
        project.dueDate &&
        <div className="grey-text text-darken-1" style={{ fontSize: 14 }}>
          <i className="far fa-clock" />
          {` Need Date - ${dateFormatted(project.dueDate)}`}
        </div>
      }
      <p>{project.desc}</p>
      <ContributorMeta
        contributors={project.contributors}
        slug={project.slug}
        context={context}
        projectCreator={projectCreator}
        userId={userId}
        userFirstname={userFirstname}
      />
    </div>
  </div>
);

Card.propTypes = {
  project: PropTypes.object.isRequired,
  context: PropTypes.string,
  userId: PropTypes.string.isRequired,
  projectCreator: PropTypes.object.isRequired,
  userFirstname: PropTypes.string.isRequired
};

// Context may be 'project' or 'user'
Card.defaultProps = {
  context: 'project'
};

export default Card;
