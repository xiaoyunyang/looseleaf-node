import React from 'react';

const icon = (id) => {
  switch (id) {
    case 'username': return 'insert_link';
    case 'displayName': return 'account_circle';
    case 'email': return 'email';
    case 'location': return 'location_on';
    case 'website': return 'public';
    default: return '';
  }
};
const type = id => id === 'email' ? 'email' : 'text';
const dataError = id => id === 'email' ? 'invalid email' : '';

export default class TextInput extends React.Component {
  handleChange(e) {
    this.props.onChange(e.target.value);
  }
  render() {
    return (
      <div className="row">
        <div className="input-field col s12 m10 l10">
          <i className="material-icons prefix">{icon(this.props.id)}</i>
          <input
            id={this.props.id}
            defaultValue={this.props.field}
            onChange={this.handleChange.bind(this)}
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
