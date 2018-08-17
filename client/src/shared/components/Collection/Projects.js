import React from 'react';
import PropTypes from 'prop-types';
import { getAppRoute } from '../../data/appRoutes';
import { dateFormatted } from '../../../lib/helpers';

const Projects = ({ projects }) => (
  <div>
    { projects &&
      projects.map(d => {
        return (
          <div className="row" key={`projects-${d.urlSlug}`}>
            <div className="col s12 m12 l12">
              <div className="card-panel">
                <a href={getAppRoute('projectPage')(d.urlSlug)} dangerouslySetInnerHTML={{ __html: d.title }} />
                <p className="grey-text text-darken-1">Created: {dateFormatted(d.createdAt)}</p>
              </div>
            </div>
          </div>
        );
      })
    }
  </div>
);
Projects.propTypes = {
  projects: PropTypes.array.isRequired
};

export default Projects;
