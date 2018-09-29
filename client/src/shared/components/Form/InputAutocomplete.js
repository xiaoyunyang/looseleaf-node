import React from 'react';
import $ from 'jquery';

export default class InputAutocomplete extends React.Component {

  initializeAutoComplete() {
    // const data = autoCompleteData(this.props.choices);
    const data = this.props.choices;

    $(document).ready(() => {
      $(`#${this.props.id}`).autocomplete({
        data: data,
        limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
        onAutocomplete: key => {
          this.props.onChange(key);
        },
        minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
      });
    });
  }
  render() {
    if (typeof document !== 'undefined') {
      this.initializeAutoComplete();
    }
    return (
      <div className="input-field col l9 m9 s12">
        <input type="text" id={this.props.id} defaultValue={this.props.selected} className="autocomplete" />
        <label htmlFor="autocomplete-input">{this.props.label}</label>
      </div>
    );
  }
}
