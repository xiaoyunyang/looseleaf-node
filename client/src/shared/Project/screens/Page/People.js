import React from 'react';
import $ from 'jquery';

const defaultUserPic = 'http://marketline.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'


// This is a ES6 class - see https://toddmotto.com/react-create-class-versus-component/
export default class People extends React.Component {
  componentDidMount() {
    this.initializeModal();
  }
  initializeModal() {
    $(document).ready(function(){
      // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();
    });
  }
  renderPersonCard(d,i) {
    return (
      <a href="#person-card-modal" key={i} className="col s6 m4 l3 modal-trigger">
        <div className="card-panel center hoverable">
          <div className="row">
            <img src={defaultUserPic} alt="" className="circle" />
          </div>
          <div className="row">
            <span className="title">
              <h6 className="truncate">{d.displayName}</h6>
              <p>{d.intro}</p>
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
          <h4>Person's Name</h4>
          <p>Short Intro</p>
          <p>email</p>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Visit Profile</a>
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
