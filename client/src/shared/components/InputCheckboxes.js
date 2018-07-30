import React from 'react';
import PropTypes from 'prop-types';

export default class InputCheckboxes extends React.Component {
  static defaultProps = {
    units: '',
    label: '',
    title: ''
  }

  handleClick(d, event) {
    const clicked = d;
    const isChecked = event.target.checked;

    let newArr = null;
    if (isChecked) {
      newArr = this.props.selected.concat(clicked);
    } else {
      newArr = this.props.selected.filter(d => d !== clicked);
    }
    this.props.handleChange(newArr);
  }
  renderUnits(data, units) {
    if (typeof data === 'number') {
      return data > 1 ? `${units}s` : units;
    }
    return units;
  }
  renderCheckbox(d) {
    return (
      <p key={`check-${this.props.d}`} onChange={this.handleClick(d)} >
        <input type="checkbox" id={d} checked="checked" />
        <label htmlFor={d}>
          {`${d} ${this.renderUnits(d, this.props.units)}`}
        </label>
      </p>
    );
  }
  render() {
    return (
      <div>
        <p>{this.props.title}</p>
        {
          this.props.choices.map(d => {
            const checked = this.props.selected.includes(d) ? 'checked' : '';
            const dId = (typeof d === 'string') ? d.replace(/ /g, '-').toLowerCase() : d;
            return (
              <p className={this.props.itemWidthStyle} key={`check-${dId}`} >
                <input type="checkbox"
                  id={`${this.props.id}-${dId}`}
                  onChange={this.handleClick.bind(this, d)}
                  checked={checked} />
                <label htmlFor={`${this.props.id}-${dId}`}>
                  {`${d} ${this.renderUnits(d, this.props.units)}`}
                </label>
              </p>
            );
          })
        }
      </div>
    );
  }
}


InputCheckboxes.propTypes = {
  id: PropTypes.string.isRequired,
  choices: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  units: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string
};
