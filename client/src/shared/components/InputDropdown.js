import React from 'react';
import $ from 'jquery';

export default class InputTags extends React.Component {

  componentDidMount() {
    $('#'+this.props.id).material_select(
      this.handleClick.bind(this)
    );
  }
  handleClick() {
    let newData = $('#'+this.props.id).val();
    this.props.setState(newData)
  }
  renderUnits(data, units) {
    if(!units) return '';

    if (typeof(data) === 'number') {
      return data > 1 ? units + 's' : units;
    }
    return units;
  }

  render() {
    return (
      <div className='input-field col l6 m6 s6'>
        <select id={this.props.id} defaultValue='None'>
          <option disabled>{this.props.label}</option>
          {
            this.props.choices.map(function(d,i) {
              return (
                <option value={d} key={i}>
                  {d + ' ' + this.renderUnits(d, this.props.units)}
                </option>);
            }.bind(this))
          }
        </select>
        <label>{this.props.label}</label>
      </div>
    );
  }
}
