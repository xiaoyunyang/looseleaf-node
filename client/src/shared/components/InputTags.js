import React from 'react';
import $ from 'jquery';

export default class InputTags extends React.Component {

  componentDidMount() {
    const tags = this.props.selectedTags.map(d => {
      return { tag: d };
    });
    const options = this.props.tags.map(d => {
      const tmp = {};
      tmp[d] = null;
      return tmp;
    }).reduce((acc, x) => {
      for (const key in x) acc[key] = x[key];
      return acc;
    }, {});

    $(document).ready(() => {
      $(`#${this.props.id}`).material_chip({
        data: tags,
        placeholder: this.props.label,
        secondaryPlaceholder: this.props.hint,
        autocompleteOptions: {
          data: options,
          limit: Infinity,
          minLength: 1
        }
      });
    });

    $(`#${this.props.id}`).on('chip.add', (e, chip) => {
      this.handleAddTag(chip.tag);
    });
    $(`#${this.props.id}`).on('chip.delete', (e, chip) => {
      this.handleDeleteTag(chip.tag);
    });
  }

  handleAddTag(tag) {
    const selectedNew = this.props.selectedTags.concat(tag);
    this.props.setState(selectedNew);
  }
  handleDeleteTag(tag) {
    const selectedNew = this.props.selectedTags.filter((d) => {
      return d !== tag;
    });
    this.props.setState(selectedNew);
  }
  render() {
    return (
      <div className="col s12 m12 l12">
        <label>{this.props.label}</label>
        <div className="chips" id={this.props.id} />
      </div>
    );
  }
}
