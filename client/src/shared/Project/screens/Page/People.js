import React from 'react';

const defaultUserPic = 'http://marketline.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'

const contributors = [
  {
    displayName: "Andrew Fenner",
    username: "afenner",
    intro: "Mobile Developer"
  },
  {
    displayName: "Xiaoyun Yang",
    username: "xiaoyunyang",
    intro: "Web Developer"
  },
  {
    displayName: "Desi Graphica",
    username: "afenner",
    intro: "Graphic Designer"
  },
  {
    displayName: "Reallyreally Longname",
    username: "xiaoyunyang",
    intro: "Copywriter"
  },
  {
    displayName: "Another Person",
    username: "afenner",
    intro: "Digital Marketer"
  },
  {
    displayName: "Oscar Wilde",
    username: "xiaoyunyang",
    intro: "Illustrator"
  }
];

class PersonModal extends React.Component {
  render() {
    return (
      <div></div>
    )
  }
}

// This is a ES6 class - see https://toddmotto.com/react-create-class-versus-component/
export default class People extends React.Component {
  renderPersonCard(d,i) {
    return (
      <a href="" key={i} className="col s6 m4 l3">
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
      <div id="contributors" className="row">
        {
          contributors.map((d,i) =>
            this.renderPersonCard(d,i)
          )
        }
        {
          this.renderInvitePersonCard()
        }
      </div>
    );
  }
}
