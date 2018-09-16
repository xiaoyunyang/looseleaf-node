import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class Cards extends React.Component {
  renderProjects(projects) {
    return (
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
          <p>{this.props.noProjectDisp}</p>
        }
      </div>
    );
  }
  render() {
    return (
      <div>
        {
          this.props.isLoading ?
          <p>Loading...</p>
          :
          <div>
            { this.renderProjects(this.props.projects) }
          </div>
        }
        {
          this.props.projects.length > 0 && !this.props.endOfPage &&
          <div className="row center">
            <a
              className="btn col s8 m4 l4 offset-s2 offset-m4 offset-l4"
              onClick={this.props.loadMoreProjects.bind(this)}
            >
              Load More
            </a>
          </div>
        }
      </div>
    );
  }
}

Cards.propTypes = {
  projects: PropTypes.array,
  noProjectDisp: PropTypes.string,
  loadMoreProjects: PropTypes.func,
  endOfPage: PropTypes.bool,
  isLoading: PropTypes.bool
};
Cards.defaultProps = {
  noProjectDisp: 'No projects found.'
}
export default Cards;
