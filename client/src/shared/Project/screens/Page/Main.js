import React from 'react';
import fetch from 'isomorphic-fetch';
import TopNav from '../../../components/TopNavUser';
import People from './People';

const dueDateFormatted = (dateStr) => {
  return new Date(dateStr).toDateString()
}
const updates = [
  'A project update from someone you follow.',
  'A project update from a co-contributor of a project on your todo-list.',
  'An announcement from someone who follows you.',
  'A project update from someone who follows you.',
  'A project update from someone who follows you.',
  'An announcement on the discussion board of the project on your todo-list.',
  'An announcement on the community board.',
]

const Reactions = () => (
  <div>
    <a href="">Interesting</a>
    <a href="">Clap</a>
    <a href="">Respond</a>
  </div>
)

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
  renderProjectContributors(contributors) {
    return (
      <div id="contributors">
        <h5>Project Contributors</h5>
        <People contributors={contributors}/>
      </div>
    )
  }
  renderNewPost() {
    return (
      <div className="card feed">
        <div className="card-content">
          <div className="row feed-user">
            <div className="col">
              <img className="circle" src={this.props.user.picture} alt=""/>
            </div>
            <div className="col">
              <p>{this.props.user.displayName}</p>
            </div>
          </div>
          <a href=''>
            <i className="material-icons">create</i> {'Post an announcement to your community or a project update'}
          </a>
        </div>
        <div className="card-action">
          <a href="">Project Update</a>
          <a href="">Announcement</a>
        </div>
      </div>
    )
  }
  renderPost(msg, id) {
    return (
      <div key={id} className="card feed">
        <div className="card-content">
          <div className="row feed-user">
            <div className="col">
              <img className="circle" src={this.props.user.picture} alt=""/>
            </div>
            <div className="col s8 m8 l8">
              <p>{this.props.user.displayName}</p>
            </div>
          </div>
          <p href=''>{msg}</p>

        </div>
        <div className="card-action">
          <Reactions />
        </div>
      </div>
    )
  }
  renderFeed() {
    return (
      <div>
        <h5>Updates</h5>
        <div className="row">
          <div className="col s12 m12 l12 user-feed">

            {
              this.renderNewPost()
            }
            {
              updates.map((d,i) => {
                return this.renderPost(d, i)
              })
            }
          </div>
        </div>
      </div>
    );
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
          {
            this.renderProjectContributors(this.props.project.contributors)
          }
          {
            this.renderFeed()
          }
        </div>
      </div>
    );
  }
}

export default Main;
