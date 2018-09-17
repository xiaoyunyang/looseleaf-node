import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

export default class InputCheckboxes extends React.Component {
  componentDidMount() {
    $('.tooltipped').tooltip();
  }
  handleClick(d, event) {
    $('.tooltipped').tooltip('open');

    const clicked = d;
    const isChecked = event.target.checked;

    let newArr = null;
    if (isChecked) {
      newArr = this.props.selected.concat(clicked);
    } else {
      newArr = this.props.selected.filter(d => d !== clicked);
    }
    this.props.onChange(newArr);
  }
  renderUnits(data, units) {
    if (typeof data === 'number') {
      return data > 1 ? `${units}s` : units;
    }
    return units;
  }
  // renderCheckbox(dSlug) {
  //   return (
  //     <p key={`check-${dSlug}`} onChange={this.handleClick(d)} >
  //       <input type="checkbox" id={dSlug} checked="checked" />
  //       <label htmlFor={dSlug}>
  //         {`${dSlug} ${this.renderUnits(dSlug, this.props.units)}`}
  //       </label>
  //     </p>
  //   );
  // }
  render() {
    return (
      <div className="input-checkboxes">
        <p>{this.props.title}</p>
        {
          this.props.choices.map(d => {
            const checked = this.props.selected.includes(d.slug) ? 'checked' : '';
            const dId = (typeof d === 'string') ? d.slug.replace(/ /g, '-').toLowerCase() : d.slug;
            return (
              <p className={this.props.itemWidthStyle} key={`check-${dId}`} >
                <input type="checkbox"
                  id={`${this.props.id}-${dId}`}
                  onChange={this.handleClick.bind(this, d.slug)}
                  checked={checked}
                />
                <label htmlFor={`${this.props.id}-${dId}`}>
                  {`${d.name} ${this.renderUnits(d, this.props.units)}`}
                </label>
                <a
                  className="tooltipped checkbox-help"
                  data-position="right"
                  data-delay="50"
                  data-tooltip={d.desc}
                >
                  <i className="fas fa-question-circle" />
                </a>
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
  onChange: PropTypes.func.isRequired,
  units: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string
};
InputCheckboxes.defaultProps = {
  units: '',
  label: '',
  title: ''
}
