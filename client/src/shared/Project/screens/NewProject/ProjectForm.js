import React from 'react';
import InputTags from '../../../components/InputTags';
import InputDropdown from '../../../components/InputDropdown';
import DatePicker from '../../../components/DatePicker';
import FlashNotif from '../../../components/FlashNotif';
import TextAreaInput from '../../../components/TextAreaInput';
import TextInput from '../../../components/TextInput';
import axios from 'axios';

const redirPath = 'http://localhost:3001';
const postPath = 'http://localhost:3001/api/project';

export default class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: '',
      selectedProjectType: this.props.projectTypes[0],
      selectedTags: [],
      aboutMe: this.props.aboutMe,
      mission: '',
      contributors: [],
      selectedPlatform: this.props.platforms[0],
      submissionInst: '',
      dueDate: '',
      flash: {
        state: 'ok',
        msg: '',
      },
    }
  }
  handleSubmit(formFields) {
    const username = this.props.user.username;
    axios.post(postPath, {formFields, username})
    .then(res => {

      if(res.statusText === 'error') {
        this.setState({
          flash: {state: res.statusText, msg: res.data}
        })
      } else if(res.statusText === 'OK') {
        // redirect to /slug if the server responds with 200 ok...
        window.location = `/project/${res.data}`;
      }

      // Perform action based on response, such as flashing error notif
    })
    .catch(function(error) {
      console.log(error);
      //Perform action based on error
    });
  }
  render() {
    return (
      <div className="col s12">
        <div className="card-panel white">
          <h5>About The Project</h5>
          <div className="row">
            <div className="col s12">
              <TextInput
                id='text-title'
                field=''
                label='Title'
                setState={d => this.setState({title: d})}
              />
              <TextAreaInput
                id='text-desc'
                field=''
                label='Description'
                setState={d => this.setState({desc: d})}
              />
              <InputDropdown
                id='select-project'
                label='Project Type'
                choices={this.props.projectTypes}
                setState={d => this.setState({selectedProjectType: d})}
              />
              <InputTags
                id='select-areas'
                label='Interest Areas'
                hint='+Interest'
                tags={this.props.tags}
                selectedTags={this.state.selectedTags}
                setState={ds => this.setState({selectedTags: ds})}
              />
            </div>
          </div>
        </div>
        <div className="card-panel white">
          <h5>About You And Your Mission</h5>
          <p style={{opacity: '0.8'}}>{'Introduce yourself. Give people a reason to get really excited about working on this project with you.'}</p>
          <div className="row">
            <div className="col s12">
              <TextAreaInput
                id='text-about-me'
                field={this.state.aboutMe}
                label='About Me'
                setState={d => this.setState({aboutMe: d})}
              />
              <TextAreaInput
                id='text-mission'
                field={this.state.mission}
                label='My Mission'
                setState={d => this.setState({mission: d})}
              />
            </div>
          </div>
        </div>
        <div className="card-panel white">
          <h5>Invite Project Contributors</h5>
          <p style={{opacity: '0.8'}}>{"Invite people you know or want to collaborate with to contribute to the project."}</p>
          <InputTags
            id='select-people'
            label='contributors'
            hint='+contributor'
            tags={this.props.people}
            selectedTags={this.state.contributors}
            setState={ds => this.setState({contributors: ds})}
          />
        </div>
        <div className="card-panel white">
          <h5>Submission</h5>
          <p style={{paddingLeft: '0.75em'}}>{"Submission Instruction."}</p>
          <div className="row">
            <div className="col s12">
              {
                <InputDropdown
                  id='select-platform'
                  label='Platform Type'
                  choices={this.props.platforms}
                  setState={d => this.setState({selectedPlatform: d})}
                />
              }
              <TextAreaInput
                id='text-desc'
                field={this.state.submissionInst}
                label='Optional Submission Instruction'
                setState={d => this.setState({submissionInst: d})}
              />
            </div>
          </div>
          <p style={{paddingLeft: '0.75em'}}>{"Set a due date. You can change the due date anytime."}</p>
          <div className="row">
            <div className="col s12 m10 l8">
              <DatePicker setState={d => this.setState({dueDate: d})}/>
            </div>
          </div>
        </div>
        <div className="row center">
          <a className="btn" onClick={this.handleSubmit.bind(this, this.state)}>
            Create Project
          </a>
        </div>
        <FlashNotif state={this.state.flash.state} msg={this.state.flash.msg}/>
      </div>
    )
  }
}
