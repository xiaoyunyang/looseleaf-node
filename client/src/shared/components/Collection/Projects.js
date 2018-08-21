import React from 'react';
import PropTypes from 'prop-types';
import appRoute from '../../data/appRoute';
import { dateFormatted } from '../../../lib/helpers';

const Projects = ({ projects }) => (
  <div>
    { projects &&
      projects.map(d => {
        return (
          <div className="row" key={`projects-${d.slug}`}>
            <div className="col s12 m12 l12">
              <div className="card-panel">
                <a href={appRoute('projectPage')(d.slug)} dangerouslySetInnerHTML={{ __html: d.title }} />
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
  projects: PropTypes.array
};

export default Projects;
