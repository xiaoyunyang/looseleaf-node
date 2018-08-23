import React from 'react';
import PropTypes from 'prop-types';
import { dateFormatted } from '../../../lib/helpers';

export default class ProjectInfo extends React.Component {
  render() {
    const { title, desc, dueDate } = this.props.projectInfo;
    return (
      <div id="project-info" className="col s12 m12 l12">
        <div className="card-panel white">
          <h4 dangerouslySetInnerHTML={{ __html: title }} />
          <p dangerouslySetInnerHTML={{ __html: desc }} />
          <p>{`Due Date: ${dateFormatted(dueDate)}`}</p>
          <div className="row">
            <div className="col">
              <a className="waves-effect waves-light btn teal teal-text lighten-5">Watch</a>
            </div>
            <div className="col">
              <a className="waves-effect waves-light btn teal lighten-1">Contribute</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectInfo.propTypes = {
  projectInfo: PropTypes.object
}
