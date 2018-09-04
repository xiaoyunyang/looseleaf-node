import React from 'react';
import PropTypes from 'prop-types';

export default class InputRadioBtns extends React.Component {
  static defaultProps = {
    units: '',
    label: '',
    title: ''
  }

  handleClick(d, event) {
    this.props.onChange(d);
  }
  renderUnits(data, units) {
    if (typeof data === 'number') {
      return data > 1 ? `${units}s` : units;
    }
    return units;
  }
  render() {
    return (
      <div>
        <p>{this.props.title}</p>
        {
          this.props.choices.map(d => {
            const checked = (this.props.selected === d) ? 'checked' : '';

            // remove all white spaces
            const dId = (typeof d === 'string') ? d.replace(/ /g, '-').toLowerCase() : d;

            return (
              <p key={`check-${dId}`}>
                <input
                  id={`${this.props.id}-${dId}`}
                  name={`${this.props.id}-${dId}`}
                  className="with-gap"
                  type="radio"
                  onChange={this.handleClick.bind(this, d)}
                  checked={checked ? 'checked' : ''}
                />
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

InputRadioBtns.propTypes = {
  id: PropTypes.string.isRequired,
  choices: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  units: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string
};
