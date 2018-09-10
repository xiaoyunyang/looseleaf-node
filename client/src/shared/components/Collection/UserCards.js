import React from 'react';
import $ from 'jquery';
import InputAutocomplete from '../Form/InputAutocomplete';
import { apiLink } from '../../data/apiLinks';
import { image } from '../../data/assetLinks';
import { getApiData, slug2Name } from '../../../lib/helpers';
import Communities from './Communities';

// This is a ES6 class - see https://toddmotto.com/react-create-class-versus-component/
export default class UserCards extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Below code is just placeholder. This should talk to an api to get
    // everyone who the user with the username follows or is followed by

    this.state = {
      communities: {}, // dictionary based on slug
      modalPerson: {
        displayName: 'Firstname Lastname',
        email: 'a@b.com',
        communities: ['Developer'],
        bio: 'hello.',
        username: 'username',
        picture: image.defaultUser
      },
      inviteChoices: {},
      invited: ''
    };
  }
  componentDidMount() {
    this.loadPeople();
    this.initializeModal();
  }
  loadPeople() {
    const url = apiLink.users;
    const setApiData = users => {
      const people = {};
      users.forEach(user => {
        people[user.displayName] = user.picture;
      });
      this.setState({inviteChoices: people})
    }
    getApiData(url, setApiData);
  }
  initializeModal() {
    $(document).ready(() => {
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();
    });
  }
  handlePersonCardClick(user) {
    this.setState({
      modalPerson: {
        fullName: user.displayName,
        email: user.email,
        username: user.username,
        bio: user.bio,
        communities: user.communities,
        picture: user.picture
      }
    });
    $('select').material_select();
  }
  renderPersonCard(user, i) {
    return (
      <a
        href="#person-card-modal"
        onClick={this.handlePersonCardClick.bind(this, user)}
        key={i}
        className="col s6 m4 l3 modal-trigger"
      >
        <div className="card-panel center hoverable">
          <div className="row">
            <img src={user.picture} alt="" className="circle" />
          </div>
          <div className="row">
            <span className="title">
              <h6 className="truncate">{user.displayName}</h6>
              <p>{user.communities.length > 0 && slug2Name(user.communities[0], true)}</p>
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
              <p>{`@${this.state.modalPerson.username}`} </p>
              <h6 style={{marginBottom: 20}}>
                {this.state.modalPerson.bio}
              </h6>
              <Communities
                cs={this.state.modalPerson.communities}
                altern={<div style={{fontWeight: 350}}>This user is not part of a community</div>}
                hasIcon />
            </div>
            <div className="col s4 m2 l4">
              <img className="circle" alt="" src={this.state.modalPerson.picture} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a href={`/@${this.state.modalPerson.username}`} className="modal-action modal-close waves-effect waves-green btn-flat">
            Visit Profile
            <i className="fa fa-angle-right" />
          </a>
        </div>
      </div>
    );
  }
  renderInvitePersonCard() {
    return (
      <a
        href="#invite-person-card-modal"
        className="col s6 m4 l3 modal-trigger"
        id="invite-card"
      >
        <div className="card-panel center hoverable">
          <div className="row">
            <i className="material-icons medium" style={{ color: '#9e9e9e' }}>person_add</i>
          </div>
          <div className="row">
            <h6 className="col s12 m12 l10 offset-l1">Invite A New Contributor</h6>
          </div>
        </div>
      </a>
    );
  }
  renderInvitePersonCardModal() {
    return (
      <div id="invite-person-card-modal" style={{ paddingBottom: 20 }} className="modal">
        <div className="modal-content">
          <h4>Invite A New Contributor</h4>
          <InputAutocomplete
            id="select-invites"
            choices={this.state.inviteChoices}
            label="Full Name"
            onChange={d => this.setState({ invited: d })}
          />
        </div>
        <div className="modal-footer" style={{ paddingBottom: 20 }}>
          <a href={`/@${this.state.modalPerson.username}`} className="modal-action modal-close teal btn-flat">
            Invite
            <i className="fa fa-paper-plane" />
          </a>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="row">
        {
          this.props.contributors.map((d, i) =>
            this.renderPersonCard(d, i))
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
