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
       format: 'mmm dd, yyyy',
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
  handleDueDateChange(dueDateMs) {
    const dueDate = new Date(dueDateMs);
    this.props.onChange(dueDate);
  }
  render() {
    return (
      <div className="row">
        <div className="input-field col l11 m11 s11">
          <input
            type="text"
            placeholder="Click to select date"
            onChange={this.handleDueDateChange}
            className="datepicker"
          />
        </div>
      </div>
    );
  }
}
