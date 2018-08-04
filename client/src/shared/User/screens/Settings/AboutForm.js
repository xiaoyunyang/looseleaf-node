import React from 'react';
import InputTags from './../../../components/InputTags';
import { interests as availableInterests} from './../../../components/TempData';
import TextInput from '../../../components/Form/TextInput';
import TextAreaInput from '../../../components/Form/TextAreaInput';

export default class AboutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: this.props.bio,
      location: this.props.location,
      website: this.props.website,
      interests: this.props.interests,
    }
  }
  handleSubmit() {
    this.props.handleSubmit(this.state);
  }
  renderTextAreaInput(id, field, label) {
    const icon = (id) => {
      switch(id) {
        case 'bio': return 'mode_edit';
        case 'communities': return 'group';
        case 'interests': return 'loyalty';
        default: return '';
      }
    }
    return (
      <div className="row">
        <div className="input-field col s12 m12 l12">
          <i className="material-icons prefix">{icon(id)}</i>
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
      </div>
    )
  }
  render() {
    return (
      <div className="card-panel white">
        <h4>About Me</h4>
        <div className="row">
          <div className="col s12 m12 l12">
            <TextAreaInput
              id='bio'
              defaultValue=''
              field={this.state.bio}
              onChange={d => this.setState({bio: d})}
              label='Bio'
            />
            <div className="row">
              <div className="col s12 m6 l6">
                <TextInput
                  id='location'
                  defaultValue=''
                  field={this.state.location}
                  onChange={d => this.setState({location: d})}
                  label='Location'
                />
              </div>
              <div className="col s12 m6 l6">
                <TextInput
                  id='website'
                  defaultValue=''
                  field={this.state.website}
                  onChange={d => this.setState({website: d})}
                  label='Website'
                />
              </div>
              <InputTags
                id='select-areas'
                label='Add Interests'
                hint='+Interest'
                tags={availableInterests}
                selectedTags={this.state.interests}
                setState={ds => this.setState({interests: ds})}
            />
            </div>
            <div className="col s12 m12 l12 center">
              <a className="btn" onClick={this.handleSubmit.bind(this, this.state)}>
                Save Changes
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
