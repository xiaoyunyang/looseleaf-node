import React from 'react';
import InputTags from './../../../components/InputTags';
import {interests} from './../../../components/TempData';

export default class AboutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: this.props.bio,
      location: this.props.location,
      website: this.props.website,
      communities: this.props.communities,
      tags: interests,
      selectedTags: this.props.interests,
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
    const icon = (id) => {
      switch(id) {
        case 'website': return 'public';
        case 'location': return 'location_on';
        default: return '';
      }
    }
    return (

        <div className="input-field col s12 m8 l6">
          <i className="material-icons prefix">{icon(id)}</i>
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
          <form className="col s12">
            { this.state.bio ?
              this.renderTextAreaInput('bio', this.state.bio, 'Bio')
              :
              this.renderTextAreaInput('bio', '', 'Bio')
            }
            <div className="row">
              { this.state.location ?
                  this.renderTextInput('location', this.state.location, 'Location')
                  :
                  this.renderTextInput('location', '', 'Location')
              }
              { this.state.website ?
                this.renderTextInput('website', this.state.website, 'Website')
                :
                this.renderTextInput('website', '', 'Website')
              }
              <InputTags
                id='select-areas'
                label='Add Interests'
                hint='+Interest'
                tags={this.state.tags}
                selectedTags={this.state.selectedTags}
                setState={ds => this.setState({selectedTags: ds})}
            />
            </div>
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
