import React from 'react';
import PropTypes from 'prop-types';
import appRoute from '../../data/appRoute';
import { dateFormatted } from '../../../lib/helpers';

const Projects = ({ projects, noProjectDisp }) => (
  <div>
    { projects && projects.length>0 ?
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
      :
      <p>{noProjectDisp}</p> 
    }
  </div>
);
Projects.propTypes = {
  projects: PropTypes.array,
  noProjectDisp: PropTypes.string
};
Projects.defaultProps = {
  noProjectDisp: 'No projects found.' 
}
export default Projects;
