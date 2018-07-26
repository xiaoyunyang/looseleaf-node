import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

export default class InputDropDown extends React.Component {
  static defaultProps = {
    units: '',
    label: '',
    title: ''
  }
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick;
  }
  componentDidMount() {
    $(`#${this.props.id}`).material_select(
      this.handleClick.bind(this)
    );
  }
  handleClick() {
    const newData = $(`#${this.props.id}`).val();
    this.props.setState(newData);
  }
  renderUnits(data, units) {
    if (typeof data === 'number') {
      return data > 1 ? `${units}s` : units;
    }
    return units;
  }

  render() {
    return (
      <div style={{ paddingTop: '12px' }} className="input-field col l6 m6 s6">
        <p>{this.props.title}</p>
        <select id={this.props.id} defaultValue='None'>
          <option value="" disabled selected>
            {this.props.label ? this.props.label : 'Choose your option'}
          </option>
          {
            this.props.choices.map(d => (
              <option value={d} key={`dropdown-${d}`}>
                {`${d} ${this.renderUnits(d, this.props.units)}`}
              </option>
            ))
          }
        </select>
        <label>{this.props.label}</label>
      </div>
    );
  }
}
InputDropDown.propTypes = {
  id: PropTypes.string.isRequired,
  choices: PropTypes.array.isRequired,
  setState: PropTypes.func.isRequired,
  units: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string
};
