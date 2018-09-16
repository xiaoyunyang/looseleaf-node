import React from 'react';

const icon = (id) => {
  switch (id) {
    case 'bio': return 'mode_edit';
    default: return null;
  }
};
export default class TextAreaInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onChange(e.target.value);
  }
  render() {
    const iconName = icon(this.props.id)
    return (
      <div className="row">
        <div className="input-field col s12 m12 l12">
          { iconName &&
            <i className="material-icons prefix grey-text text-darken-2">{icon(this.props.id)}</i>
          }
          <textarea
            id={this.props.id}
            defaultValue={this.props.field}
            onChange={this.handleChange}
            className="materialize-textarea"
          />
          <label htmlFor={this.props.id} className={!this.props.field ? '' : 'active'}>
            {this.props.label}
          </label>
        </div>
      </div>
    );
  }
}
