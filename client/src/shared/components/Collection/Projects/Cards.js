import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import LoadMoreBtn from '../../LoadMoreBtn';

class Cards extends React.Component {
  renderProjects(projects) {
    return (
      <div>
        { projects && projects.length>0 ?
          projects.map(project => {
            return (
              <div className="row" key={`projects-${project.slug}`}>
                <Card
                  project={project}
                  context={this.props.context}
                  projectCreator={project.postedBy.toString()}
                  userId={this.props.userId}
                  userFirstname={this.props.userFirstname}
                />
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
          <LoadMoreBtn
            handleClick={this.props.loadMoreProjects.bind(this)}
            itemName='Projects'
          />
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
  isLoading: PropTypes.bool,
  context: PropTypes.string,
  userId: PropTypes.string,
  userFirstname: PropTypes.string
};
Cards.defaultProps = {
  noProjectDisp: 'No projects found.',
  context: 'project'
}
export default Cards;
