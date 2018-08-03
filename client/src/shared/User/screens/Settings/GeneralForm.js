import React from 'react';
import axios from 'axios';
import { dynamicApiLink } from '../../../data/apiLinks';
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
  handleSubmit(formFields) {
    const userId = this.props.userId;
    axios.post(dynamicApiLink(userId).user, { formFields, userId })
      .then(res => {
        if (res.statusText === 'error') {
          this.setState({
            flash: {state: res.statusText, msg: res.data}
          });
        } else if (res.statusText === 'OK') {
          // redirect to /slug if the server responds with 200 ok...

          // TODO: This doesn't work that well. The page is redirected, but nothing
          // shows up. The page eventually shows after I manually refresh
          // the page in browser. Maybe I need to add a timer?
          window.location = `/@${res.data}`;
        }
        // Perform action based on response, such as flashing error notif
      })
      .catch(function(error) {
        console.log(error);
        //Perform action based on error
      });
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
  render() {
    return (
      <div className="card-panel white">
        <h4>General</h4>
        <div className="row">
          <div className="col s5 m3 l3 offset-s3">
            { this.renderImgInput(this.props.picture) }
          </div>
          <form className="col s12 m8 l8">
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
              this.renderPasswordInput()
            }
            <div className="col s12 m12 l12 center">
              <a className="btn" onClick={this.handleSubmit.bind(this, this.state)}>
                Save Changes
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
