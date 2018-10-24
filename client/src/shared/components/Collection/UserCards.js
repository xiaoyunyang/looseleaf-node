import React from 'react';
import $ from 'jquery';
import InputAutocomplete from '../Form/InputAutocomplete';
import { apiLink } from '../../data/apiLinks';
import { image } from '../../data/assetLinks';
import { getApiData } from '../../../lib/helpers';
import Communities from './Communities/Chips';
import { communityName } from './Communities/lib'
import FlashNotif from '../FlashNotif';
import TextWithLinks from '../TextWithLinks';

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
        communities: ['developer'],
        bio: 'hello.',
        username: 'username',
        picture: image.defaultUser
      },
      inviteChoices: {},
      invited: '',
      inviteSuccess: false,
      flash: { status: 'none', msg: 'succes' }
    };
    this.inviteNewContributor = this.inviteNewContributor.bind(this);
    this.handleSetInvited = this.handleSetInvited.bind(this);
    this.displayFlash = this.displayFlash.bind(this);
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
        // people[user.displayName] = user.picture;
        const name = user.displayName ? user.displayName : user.username;
        people[user._id] = { name, picture: user.picture };
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
    const userCommunitiesDisp = userCs => {
      const [fst, ...rst] = userCs;
      const fstName = communityName(fst).slice(0,-1); // the slice is so we have singular instead of plural version of the word
      const rstNum = rst.length > 0 ? ` +${rst.length}` : '';
      return `${fstName}${rstNum}`;
    }
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
              <p>{user.communities.length > 0 && userCommunitiesDisp(user.communities)}</p>
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
              <div style={{marginBottom: 20}}>
                <TextWithLinks content={this.state.modalPerson.bio} />
              </div>
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
          <a
            className="modal-action modal-close btn-flat"
            href={`/@${this.state.modalPerson.username}`}
          >
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
  inviteNewContributor() {
    if (this.state.invited === '' || !this.state.inviteChoices[this.state.invited]) {
      this.displayFlash('error', 'Please enter valid user name to invite as a contributor.');
    } else {
      this.props.inviteNewContributor(this.state.invited, this.displayFlash);
    }
  }
  handleSetInvited(userId) {
    this.setState({ invited: userId })
  }
  displayFlash(status, msg) {
    const flashUpdated = { status, msg };
    const flashNone = {status: 'none', msg: ''}

    if (status==='success') {
      this.setState({
        inviteSuccess: true
      });
      return;
    }

    const toWait = 3000; // 3 seconds
    // NOTE: what's happening below is we want to show alert box for three seconds with
    // the right color and alert message. After three seconds, the alert box disappears
    this.setState({
      flash: flashUpdated
    });
    setTimeout(() => this.setState({
      flash: flashNone
    }),
    toWait);
  }
  renderInvitePersonCardModal(inviteSuccess) {
    const invitedName = inviteSuccess ? this.state.inviteChoices[this.state.invited].name : '';
    return (
      <div id="invite-person-card-modal" style={{ paddingBottom: 20 }} className="modal">
        <div className="modal-content">
          <h4>Invite A New Contributor</h4>
          {
            !inviteSuccess &&
            <div>
              <div className="row">
                <FlashNotif state={this.state.flash.status} msg={this.state.flash.msg} />
              </div>
              <InputAutocomplete
                id="select-invites"
                choices={this.state.inviteChoices}
                label="Full Name"
                selected={this.state.invited}
                onChange={this.handleSetInvited}
              />
            </div>
          }
          {
            inviteSuccess &&
            <div className="">
              <h6>
                {`Invitation to ${invitedName} was sent successfully`}
              </h6>
              <h6>
                {`${invitedName} will become a contributor once he clicks "Contribute" on this project page`}
              </h6>
              <div style={{paddingTop: 20}}>
                <button className="btn" onClick={() => this.setState({inviteSuccess: false, invited: ''})}>
                  Invite Another Contributor
                </button>
              </div>
            </div>
          }
        </div>
        <div className="modal-footer" style={{ paddingBottom: 20 }}>
          {
            !inviteSuccess &&
            <button onClick={this.inviteNewContributor}
              className="modal-action teal btn-flat">
              Invite
              <i className="fa fa-paper-plane" />
            </button>
          }
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
          this.renderInvitePersonCardModal(this.state.inviteSuccess)
        }
      </div>
    );
  }
}
