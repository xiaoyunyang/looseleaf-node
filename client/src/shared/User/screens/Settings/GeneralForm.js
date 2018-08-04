import React from 'react';
import TextInput from '../../../components/Form/TextInput';

export default class GeneralForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      username: this.props.username,
      displayName: this.props.displayName
    };
  }
  renderPasswordInput() {
    return (
      <div className="row">
        <div className="input-field col s12 m6 l6">
          <i className="material-icons prefix">lock</i>
          <input
            id="oldPassword"
            type="password"
            className="validate"
          />
          <label htmlFor="oldPassword">Old Password</label>
        </div>
        <div className="input-field col s10 m6 l6 offset-s2">
          <input
            id="newPassword"
            type="password"
            className="validate"
          />
          <label htmlFor="newPassword">New Password</label>
        </div>
      </div>
    );
  }
  renderImgInput(imgUrl) {
    return (
      <img src={imgUrl} alt="" className="circle" />
    );
  }
  handleSubmit() {
    this.props.handleSubmit(this.state);
  }
  render() {
    return (
      <div className="card-panel white">
        <h4>General</h4>
        <div className="row">
          <div className="col s5 m3 l3 offset-s3">
            { this.renderImgInput(this.props.picture) }
          </div>
          <div className="col s12 m8 l8">
            <TextInput
              id='username'
              defaultValue=''
              field={this.state.username}
              onChange={d => this.setState({username: d})}
              label='username'
            />
            <TextInput
              id='displayName'
              defaultValue=''
              field={this.state.displayName}
              onChange={d => this.setState({displayName: d})}
              label='Firstname Lastname'
            />
            <TextInput
              id='email'
              defaultValue=''
              field={this.state.email}
              onChange={d => this.setState({email: d})}
              label='Email'
            />
            {
              // this.renderPasswordInput()
            }
            <div className="col s12 m12 l12 center">
              <btn className="btn" onClick={this.handleSubmit.bind(this, this.state)}>
                Save Changes
              </btn>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
