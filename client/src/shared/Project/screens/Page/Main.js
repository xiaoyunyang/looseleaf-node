import React from 'react';
import fetch from 'isomorphic-fetch';
import TopNav from '../../../components/TopNavUser';
import People from './People';


const dueDateFormatted = (dateStr) => {
  return new Date(dateStr).toDateString()
}

// This is a ES6 class - see https://toddmotto.com/react-create-class-versus-component/
class Main extends React.Component {
  renderProjectInfo(project) {
    return (
      <div className="col s12 m12 l12">
        <div className="card-panel white">
          <h4>{project.title}</h4>
          <p>{project.description}</p>
          <p>{`Due Date: ${dueDateFormatted(project.dueDate)}`}</p>
        </div>
      </div>
    )
  }

  render() {
    console.log("Project page.....project", this.props.project)
    return (
      <div className="section-white">
        <TopNav route={this.props.route} user={this.props.user} useExternLinks={true}/>
        <div className="container">
          {
            this.renderProjectInfo(this.props.project)
          }
          <h5>Project Contributors</h5>
          <People />
        </div>
      </div>
    );
  }
}

export default Main;
