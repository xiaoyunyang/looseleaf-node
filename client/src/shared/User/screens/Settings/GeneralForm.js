import React from 'react';

export default class GeneralForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      username: this.props.username,
      displayName: this.props.displayName
    }
  }
  handleChange(id, e) {
    if(id==='email') {
      this.setState({email: e.target.value})
    } else if(id==='username') {
      this.setState({username: e.target.value})
    } else if(id==='displayName') {
      this.setState({displayName: e.target.value})
    }
  }
  renderTextInput(id, field, label) {
    const icon = (id) => {
      switch(id) {
        case 'username': return 'insert_link';
        case 'displayName': return 'account_circle';
        case 'email': return 'email';
        default: return '';
      }
    }
    const type = id==='email' ? 'email' : 'text'
    const dataError = id==='email' ? 'invalid email' : ''
    return (
      <div className="row">
        <div className="input-field col s12 m10 l10">
          <i className="material-icons prefix">{icon(id)}</i>
          <input
            id={id}
            defaultValue={field}
            onChange={this.handleChange(this, id)}
            type={type} className="validate"/>
          <label htmlFor={id}
            data-error={dataError}
            data-success={''}
            className={!field ? '' : 'active'}>
            {label}
          </label>
        </div>
      </div>
    )
  }
  renderPasswordInput() {
    return (
      <div className="row">
        <div className="input-field col s12 m6 l6">
          <i className="material-icons prefix">lock</i>
          <input id="oldPassword" type="password"
            className="validate"/>
          <label htmlFor="oldPassword">Old Password</label>
        </div>
        <div className="input-field col s10 m6 l6 offset-s1">
          <input id="newPassword" type="password"
            className="validate"/>
          <label htmlFor="newPassword">New Password</label>
        </div>
      </div>
    )
  }
  renderImgInput(imgUrl) {
    return (
      <img src={imgUrl} alt="" className="circle"/>
    )
  }
  render() {
    return (
      <div className="card-panel white">
        <h4>General</h4>
        <div className="row">
        <div className="col s10 m4 l4 offset-s1">
          {this.renderImgInput(this.props.picture)}
        </div>
          <form className="col s12 m8 l8">
            { this.state.username ?
                this.renderTextInput('username', this.state.username, 'Username')
                :
                this.renderTextInput('username', '', 'Username')
            }
            { this.state.displayName ?
                this.renderTextInput('displayName', this.state.displayName, 'Display Name')
                :
                this.renderTextInput('displayName', '', 'Display Name')
            }
            { this.state.email ?
                this.renderTextInput('email', this.state.email, 'Email')
                :
                this.renderTextInput('email', '', 'Email')
            }
            {
              this.renderPasswordInput()
            }
            <div className="col s12 m12 l12 center">
              <button className="btn" type="submit" name="action">Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
