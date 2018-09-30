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
        social: {
          linkedin: 'https://linkedin.com',
        }
      }
    };
  }
  componentDidMount() {
    this.initializeModal();
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
        fullName: user.fullName,
        bio: user.bio,
        role: user.role,
        linkedin: user.linkedin,
        social: user.social,
        img: user.img
      }
    });
  }
  renderPersonCard(user, i) {
    return (
      <div key={i} className="center col s12 m4 l3">
        <a
          href="#person-card-modal"
          onClick={this.handlePersonCardClick.bind(this, user)}
          key={i}
          className="modal-trigger"
        >
          <div className="team-member-picture z-depth-2">
            <img src={user.img} alt="" />
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
    const socialLinks = this.state.modalPerson.social;
    return (
      <div id="person-card-modal" className="modal">
        <div className="modal-content">
          <div className="row">
            <div className="col s10 m6 l4 offset-s1 offset-m3">
              <img className="circle" alt="" src={this.state.modalPerson.img}/>
              <div className="row team-socials">
                {
                  socialLinks.linkedin &&
                  <div className="col">
                    <a style={{color: '#0077b5'}}
                      href={socialLinks.linkedin}
                      target="_blank"
                    ><i className="fab fa-linkedin" /></a>
                  </div>
                }
                {
                  socialLinks.github &&
                  <div className="col">
                    <a style={{color: '#333'}}
                      href={socialLinks.github}
                      target="_blank"
                    ><i className="fab fa-github" /></a>
                  </div>
                }
                {
                  socialLinks.medium &&
                  <div className="col">
                    <a style={{color: '#000'}}
                      href={socialLinks.medium}
                      target="_blank"
                    ><i className="fab fa-medium-m" /></a>
                  </div>
                }
                {
                  socialLinks.angellist &&
                  <div className="col">
                    <a style={{color: '#000'}}
                      href={socialLinks.angellist}
                      target="_blank"
                    ><i className="fab fa-angellist" /></a>
                  </div>
                }
                {
                  socialLinks.website &&
                  <div className="col">
                    <a style={{color: '#555'}}
                      href={socialLinks.website}
                      target="_blank"
                    ><i className="fas fa-globe-americas" /></a>
                  </div>
                }

              </div>
            </div>
            <div className="col s12 m10 l8">
              <h5>{this.state.modalPerson.fullName}</h5>
              <p>{this.state.modalPerson.bio}</p>
            </div>
          </div>

        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="row">
        {
        this.props.team.map((d, i) =>
          this.renderPersonCard(d, i))
      }
        {
        this.renderPersonCardModal()
      }
      </div>
    );
  }
}
