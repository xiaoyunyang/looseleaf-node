import React from 'react';
import $ from 'jquery';

const defaultUserPic = 'http://localhost:3001/user.png';

export default class TeamMembers extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Below code is just placeholder. This should talk to an api to get
    // everyone who the user with the username follows or is followed by
    this.state = {
      modalPerson: {
        fullName: 'Firstname Lastname',
        role: 'CEO',
        bio: 'stuff',
        img: defaultUserPic,
        linkedin: 'https://linkedin.com',
      }
    };
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
  renderPersonCard(user, i) {
    return (
      <div key={i} className="center col s6 m2 l2">
        <a href="#person-card-modal"
           onClick={this.handlePersonCardClick.bind(this, user)}
           key={i}
           className="modal-trigger"
        >
          <div className="team-member-picture z-depth-2">
            <img src={user.img} alt=""/>
          </div>
        </a>
        <div className="team-member-info">
          <span className="team-member-info-name">
            {user.fullName}
          </span>
          <span className="team-member-info-role">
            {user.role}
          </span>
        </div>
      </div>
    );
  }
  renderPersonCardModal() {
    return (
      <div id="person-card-modal" className="modal">
        <div className="modal-content">
          <div className="row">
            <div className="col s8 m10 l8">
              <h5>{this.state.modalPerson.fullName}</h5>
              <h6>{this.state.modalPerson.bio}</h6>
            </div>
            <div className="col s4 m2 l4">
              <img className="circle" alt="" src={this.state.modalPerson.img}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
  handlePersonCardClick(user) {
    this.setState({
      modalPerson: {
        fullName: user.fullName,
        bio: user.bio,
        role: user.role,
        linkedin: user.linkedin,
        img: user.img
      }
    });
  }
  render() {
    return (
      <div className="row">
        {
        this.props.people.map((d, i) =>
          this.renderPersonCard(d, i))
      }
        {
        this.renderPersonCardModal()
      }
      </div>
    );
  }
}
