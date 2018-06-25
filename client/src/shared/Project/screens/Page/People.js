import React from 'react';
import $ from 'jquery';
import InputAutocomplete from '../../../components/InputAutocomplete';


//const defaultUserPic = 'http://marketline.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
const defaultUserPic = 'http://localhost:3001/user.png'

// This is a ES6 class - see https://toddmotto.com/react-create-class-versus-component/
export default class People extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Below code is just placeholder. This should talk to an api to get
    // everyone who the user with the username follows or is followed by
    let users = {
      'Johnny Spice': defaultUserPic,
      'Cassie Cassidy': defaultUserPic,
      'Dexter Rabe': defaultUserPic,
    };
    this.state = {
      modalPerson: {
        fullName: 'Firstname Lastname',
        email: 'a@b.com',
        intro: "Hello!",
        username: "username"
      },
      inviteChoices: users,
      invited: '',
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
  renderPersonCard(user,i) {
    return (
      <a href="#person-card-modal"
         onClick={this.handlePersonCardClick.bind(this, user)}
         key={i}
         className="col s6 m4 l3 modal-trigger"
       >
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
          <div className="row">
            <div className="col s8 m10 l8">
              <h4>{this.state.modalPerson.fullName}</h4>
              <h6>role: {this.state.modalPerson.intro}</h6>
                email: <a href={`mailto: ${this.state.modalPerson.email}`}>
                {this.state.modalPerson.email}
                </a>
              <h6>Some stats displayed about this person in a row...</h6>
            </div>
            <div className="col s4 m2 l4">
              <img className="circle" alt="" src={defaultUserPic}/>
            </div>
          </div>
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
  handlePersonCardClick(user) {
    this.setState( {
      modalPerson: {
        fullName: user.displayName,
        email: user.email,
        username: user.username,
        intro: user.intro
      }
    });
    $('select').material_select();
  }
  renderInvitePersonCard() {
    return (
      <a href="#invite-person-card-modal"
         className="col s6 m4 l3 modal-trigger"
         id="invite-card">
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
  renderInvitePersonCardModal() {
    return (
      <div id="invite-person-card-modal" style={{paddingBottom: 20}} className="modal">
        <div className="modal-content">
          <h4>Invite A New Contributor</h4>
            {
              <InputAutocomplete
                id='select-invites'
                choices={this.state.inviteChoices}
                label={'Full Name'}
                setState={d => this.setState({invited: d})}
              />
            }
        </div>
        <div className="modal-footer" style={{paddingBottom: 20}}>
          <a href={`/@${this.state.modalPerson.username}`} className="modal-action modal-close teal btn-flat">
            Invite
            <i className="fa fa-paper-plane"></i>
          </a>
        </div>
      </div>
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
          this.renderPersonCardModal()
        }
        {
          this.renderInvitePersonCard()
        }
        {
          this.renderInvitePersonCardModal()
        }
      </div>
    );
  }
}
