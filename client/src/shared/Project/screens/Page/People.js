import React from 'react';
import $ from 'jquery';

const defaultUserPic = 'http://marketline.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'


// This is a ES6 class - see https://toddmotto.com/react-create-class-versus-component/
export default class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalPerson: {
        fullName: 'Firstname Lastname',
        email: 'a@b.com',
        intro: "Hello!",
        username: "username"
      }
    }
  }
  componentDidMount() {
    this.initializeModal();
  }
  initializeModal() {
    $(document).ready(function(){
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();
    });
  }
  handlePersonCardClick(user) {
    this.setState( {
      modalPerson: {
        fullName: user.displayName,
        email: user.email,
        username: user.username,
        intro: user.intro
      }
    });
  }
  renderPersonCard(user,i) {
    return (
      <a href="#person-card-modal" onClick={this.handlePersonCardClick.bind(this, user)} key={i} className="col s6 m4 l3 modal-trigger">
        <div className="card-panel center hoverable">
          <div className="row">
            <img src={defaultUserPic} alt="" className="circle" />
          </div>
          <div className="row">
            <span className="title">
              <h6 className="truncate">{user.displayName}</h6>
              <p>{user.intro}</p>
            </span>
          </div>
        </div>
      </a>
    );
  }
  renderPersonCardModal() {
    return (
      <div id="person-card-modal" className="modal">
        <div className="modal-content">
          <h4>{this.state.modalPerson.fullName}</h4>
          <h6>{this.state.modalPerson.intro}</h6>
          <a href={`mailto: ${this.state.modalPerson.email}`}>
            {this.state.modalPerson.email}
          </a>
        </div>
        <div className="modal-footer">
          <a href={`/@${this.state.modalPerson.username}`} className="modal-action modal-close waves-effect waves-green btn-flat">
            Visit Profile
            <i className="fa fa-angle-right"></i>
          </a>

        </div>
      </div>
    )
  }
  renderInvitePersonCard() {
    return (
      <a href="" className="col s6 m4 l3" id="invite-card">
        <div className="card-panel center hoverable">
          <div className="row">
            <i className="material-icons medium" style={{color: '#9e9e9e'}}>person_add</i>
          </div>
          <div className="row">
            <h6 className="col s12 m12 l10 offset-l1">Invite A New Contributor</h6>
          </div>
        </div>
      </a>
    )
  }
  render() {
    return (
      <div className="row">
        {
          this.props.contributors.map((d,i) =>
            this.renderPersonCard(d,i)
          )
        }
        {
          this.renderInvitePersonCard()
        }
        {
          this.renderPersonCardModal()
        }
      </div>
    );
  }
}
