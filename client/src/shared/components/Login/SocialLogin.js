import React from 'react';
import PropTypes from 'prop-types';
import { apiLink } from '../../data/apiLinks'
import appRoute from '../../data/appRoute';

class SocialLogin extends React.Component {
  constructor() {
    super();
    SocialLogin.propTypes = {
      oauthOpts: PropTypes.array.isRequired,
      action: PropTypes.string.isRequired
    };
    this.state = {
      clientModeOn: false
    }
  }
  componentDidMount(){
    this.setState({
      clientModeOn: true
    })
  }
  renderLoginBtn(oauth, action, key) {
    // capitalize first letter of oath. Example: facebook => Facebook
    const oauthName = oauth[0].toUpperCase() + oauth.substr(1);
    const redirPath = `${apiLink.authPath}/${oauth}?redirPath=${this.props.redirPath}`
    return (
      <div key={key} className={`btn-${oauth}`}>
        <a className="btn" href={redirPath}>
          <i className={`fab fa-${oauth} fa-lg`} />
          {`${this.props.action} with ${oauthName}`}
        </a>
      </div>
    );
  }
  render() {
    return (
      <div className="col s12 m10 offset-m1 l8 offset-l2 social-logins">
        { this.state.clientModeOn ?
            this.props.oauthOpts.map((oauth, i) => {
              return this.renderLoginBtn(oauth, this.props.action, i);
            })
            :
            null
        }
      </div>
    );
  }
}
SocialLogin.propTypes = {
  oauthOpts: PropTypes.array.isRequired,
  action: PropTypes.string.isRequired,
  redirPath: PropTypes.string
};
SocialLogin.defaultProps = {
  redirPath: appRoute('userHome')
};
export default SocialLogin;
