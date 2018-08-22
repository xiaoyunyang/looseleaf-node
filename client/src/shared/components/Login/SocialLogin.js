import React from 'react';
import PropTypes from 'prop-types';
import { apiLink } from '../../data/apiLinks'

class SocialLogin extends React.Component {
  constructor() {
    super();
    SocialLogin.propTypes = {
      oauthOpts: PropTypes.array.isRequired,
      action: PropTypes.string.isRequired
    };
  }
  renderLoginBtn(oauth, action, key) {
    // capitalize first letter of oath. Example: facebook => Facebook
    const oauthName = oauth[0].toUpperCase() + oauth.substr(1);

    return (
      <div key={key} className={`btn-${oauth}`}>
        <a className="btn" href={`${apiLink.authPath}/${oauth}`}>
          <i className={`fab fa-${oauth} fa-lg`} />
          {`${this.props.action} with ${oauthName}`}
        </a>
      </div>
    );
  }
  render() {
    return (
      <div className="col s12 m10 offset-m1 l8 offset-l2 social-logins">
        {
          this.props.oauthOpts.map((oauth, i) => {
            return this.renderLoginBtn(oauth, this.props.action, i);
          })
        }
      </div>
    );
  }
}
export default SocialLogin;
