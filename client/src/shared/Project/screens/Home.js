import React from 'react';
import fetch from 'isomorphic-fetch';
import TopNav from '../../components/TopNavUser';

import axios from 'axios';


// This is a ES6 class - see https://toddmotto.com/react-create-class-versus-component/
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null
    }
  }
  componentWillMount() {
    axios.get('http://localhost:3001/api/project')
      .then(function (response) {
        // handle success
        this.setState({
          projects: response.data
        })
      }.bind(this))
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  renderProjects(projects) {
    return (
      <div>
        { projects.map((d,i) => {
          return (
            <div className="row" key={i}>
              <div className="col s12 m12 l12">
                <div className="card-panel">
                  <a href={`http://localhost:3001/project/${d.urlSlug}`} dangerouslySetInnerHTML={{__html: d.title}} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )
  }

  render() {
    return (
      <div className="section-white">
        <TopNav route={this.props.route} user={this.props.user} useExternLinks={true}/>
        <div className="container">
          <h3>My Projects</h3>
          {
            this.state.projects ? this.renderProjects(this.state.projects) : null
          }
        </div>
      </div>
    );
  }
}

export default Home;
