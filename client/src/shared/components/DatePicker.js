import React from 'react';
import $ from 'jquery';

export default class DatePicker extends React.Component {
  componentDidMount() {
    this.initializeDatePicker();
  }
  initializeDatePicker() {
    // datepicker is based on http://amsul.ca/pickadate.js/api/
    // Fix issue with onClose: https://github.com/amsul/pickadate.js/issues/160
    $('.datepicker').pickadate({
      selectMonths: true,
      selectYears: 15,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false,
      onClose() {
        $(":focus").blur();
      },
      onSet: function (context) {
        this.handleDueDateChange(context.select);
      }.bind(this)
    });
  }
  handleDueDateChange(dueDate_ms) {
    const dueDate = new Date(dueDate_ms);
    this.props.setState(dueDate);
  }
  render() {
    return (
      <div className="input-field col l11 m11 s11">
        <input type="text"
          placeholder="Click to select date"
          onChange={this.handleDueDateChange}
          className="datepicker"
        />
      </div>
    );
  }
}
