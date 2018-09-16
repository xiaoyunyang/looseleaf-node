import React from 'react';

const icon = (id) => {
  switch (id) {
    case 'username': return 'insert_link';
    case 'displayName': return 'account_circle';
    case 'email': return 'email';
    case 'location': return 'location_on';
    case 'website': return 'public';
    default: return null;
  }
};
const type = id => id === 'email' ? 'email' : 'text';
const dataError = id => id === 'email' ? 'invalid email' : '';

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onChange(e.target.value);
  }
  render() {
    const iconName = icon(this.props.id);
    return (
      <div className="row">
        <div className={`input-field col s12 m12 l12`}>
          {iconName &&
            <i className="material-icons prefix grey-text text-darken-2">{iconName}</i>
          }
          <input
            id={this.props.id}
            defaultValue={this.props.field}
            onChange={this.handleChange}
            type={type(this.props.id)}
            className="validate"
          />
          <label
            htmlFor={this.props.id}
            data-error={dataError(this.props.id)}
            data-success=""
            className={!this.props.field ? '' : 'active'}
          >
            {this.props.label}
          </label>
        </div>
      </div>
    );
  }
}
