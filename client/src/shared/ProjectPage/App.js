import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../redux/Project/actions/project';
import TopNavGuest from '../components/TopNavSimple';
import TopNavUser from '../components/TopNavUser';

const dueDateFormatted = (dateStr) => {
  return dateStr ? new Date(dateStr).toDateString() : '';
};

class App extends React.Component {
  componentDidMount() {
    // TODO: Get contributor data
  }
  renderProjectInfo(project) {
    // TODO and NOTE: Make sure the default values match the redux init state values.
    // Otherwise, there's going to be a warning about how server and client do not match.
    const title = project ? project.info.title : 'placeholder title';
    const desc = project ? project.info.desc : 'placeholder desc';
    const dueDate = project ? project.info.dueDate : '2018-07-14T04:44:56.361Z';

    return (
      <div id="project-info" className="col s12 m12 l12">
        <div className="card-panel white">
          <h4 dangerouslySetInnerHTML={{ __html: title }} />
          <p dangerouslySetInnerHTML={{ __html: desc }} />
          <p>{`Due Date: ${dueDateFormatted(dueDate)}`}</p>
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
  render() {
    console.log('state....', this.props)
    return (
      <div className="section-white">
        {
          this.props.user.info ?
            <TopNavUser user={this.props.user.info} useExternLinks={true} />
            :
            <TopNavGuest useExternLinks />
        }
        <div className="container">
          {
            this.renderProjectInfo(this.props.project)
          }
        </div>
      </div>
    )
  }
}

// This function lets you convert the app state to properties on your component.
function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
