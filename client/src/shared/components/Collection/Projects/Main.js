import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const Main = ({ projects, noProjectDisp }) => (
  <div>
    { projects && projects.length>0 ?
      projects.map(project => {
        return (
          <div className="row" key={`projects-${project.slug}`}>
            <Card project={project} />
          </div>
        );
      })
      :
      <p>{noProjectDisp}</p>
    }
  </div>
);
Main.propTypes = {
  projects: PropTypes.array,
  noProjectDisp: PropTypes.string
};
Main.defaultProps = {
  noProjectDisp: 'No projects found.'
}
export default Main;
