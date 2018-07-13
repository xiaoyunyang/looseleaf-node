import React from 'react';
import InputTags from '../../../components/InputTags';
import InputDropdown from '../../../components/InputDropdown';
import DatePicker from '../../../components/DatePicker';

class TextInput extends React.Component {
  handleChange(e) {
    this.props.setState(e.target.value);
  }
  render() {
    return (
      <div className="input-field col s12 m12 l12">
        <input
          id={this.props.id}
          defaultValue={this.props.field}
          onChange={this.handleChange.bind(this)}
          type="text" className="validate"/>
        <label htmlFor={this.props.id}
          className={!this.props.field ? '' : 'active'}>
          {this.props.label}
        </label>
      </div>
    )
  }
}
class TextAreaInput extends React.Component {
  handleChange(e) {
    this.props.setState(e.target.value);
  }
  render() {
    return (
      <div className="input-field col s12 m12 l12">
        <textarea
          id={this.props.id}
          defaultValue={this.props.field}
          onChange={this.handleChange.bind(this)}
          className="materialize-textarea">
        </textarea>
        <label htmlFor={this.props.id} className={!this.props.field ? '' : 'active'}>
          {this.props.label}
        </label>
      </div>
    )
  }
}

export default class AboutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: '',
      selectedProjectType: this.props.projectTypes[0],
      selectedInterests: [],
      aboutMe: this.props.aboutMe,
      mission: '',
      contributors: [],
      selectedPlatform: this.props.platforms[0],
      submissionInst: '',
      dueDate: ''
    }
  }
  handleChange(id, e) {
    if(id==='bio') {
      this.setState({bio: e.target.value})
    } else if(id==='location') {
      this.setState({location: e.target.value})
    } else if(id==='website') {
      this.setState({website: e.target.value})
    } else if(id==='interests') {
      this.setState({interests: e.target.value})
    } else if(id==='communities') {
      this.setState({communities: e.target.value})
    }
  }
  renderTextInput(id, field, label) {
    return (
      <div className="input-field col s12 m12 l12">
        <input
          id={id}
          defaultValue={field}
          onChange={this.handleChange(this, id)}
          type="text" className="validate"/>
        <label htmlFor={id}
          className={!field ? '' : 'active'}>
          {label}
        </label>
      </div>
    )
  }
  renderTextAreaInput(id, field, label) {
    return (
      <div className="input-field col s12 m12 l12">
        <textarea
          id={id}
          defaultValue={field}
          onChange={this.handleChange(this, id)}
          className="materialize-textarea">
        </textarea>
        <label htmlFor={id} className={!field ? '' : 'active'}>
          {label}
        </label>
      </div>
    )
  }
  render() {
    console.log(this.state)
    return (
      <form className="col s12">
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
                tags={this.props.interests}
                selectedTags={this.state.selectedInterests}
                setState={ds => this.setState({selectedInterests: ds})}
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
          <button className="btn" type="submit" name="action">
            Create Project
          </button>
        </div>
      </form>
    )
  }
}
