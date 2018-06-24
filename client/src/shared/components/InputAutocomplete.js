import React from 'react';
import $ from 'jquery';

const defaultUserPic = 'http://localhost:3001/user.png';


export default class InputAutocomplete extends React.Component {

  componentDidMount() {
    let data = this.props.choices;
    $(document).ready(function(){
      $('#'+this.props.id).autocomplete({
        data: data,
        limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
        onAutocomplete: function(val) {
          this.props.setState(val)
        }.bind(this),
        minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
      });
    }.bind(this));
  }
  handleClick() {
    let newData = $('#'+this.props.id).val();
    this.props.setState(newData)
  }
  render() {
    return (
      <div className='input-field col l9 m9 s12'>
        <input type="text" id={this.props.id} className="autocomplete"/>
        <label htmlFor="autocomplete-input">{this.props.label}</label>
      </div>
    );
  }
}
