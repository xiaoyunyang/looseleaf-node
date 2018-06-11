import React from 'react';

const defaultUserPic = 'http://marketline.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'

const contributors = [
  {
    displayName: "Andrew Fenner",
    username: "afenner",
    intro: "mobile developer"
  },
  {
    displayName: "Xiaoyun Yang",
    username: "xiaoyunyang",
    intro: "web developer"
  }
]

// This is a ES6 class - see https://toddmotto.com/react-create-class-versus-component/
export default class People extends React.Component {
  renderPersonCard(d,i) {
    return (
      <div className="col s6 m3 l3">
        <div className="card-panel center card--hasHoverShadow">
          <div className="row">
            <img src={defaultUserPic} alt="" className="circle" />
          </div>
          <div className="row">
            <span className="title">
              <a href="/">
                {d.displayName}
              </a>
              <p>{d.intro}</p>
            </span>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <ul id="contributors" className="row">
        {
          contributors.map((d,i) =>
            this.renderPersonCard(d,i)
          )
      }
      </ul>
    );
  }
}
