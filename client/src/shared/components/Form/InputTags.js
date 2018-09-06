import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

export default class InputTags extends React.Component {
  componentDidMount() {
    this.initializeChips();
  }
  initializeChips() {
    $(`#${this.props.id}`).on('chip.add', (e, chip) => {
      this.handleAddTag(chip.tag);
    });
    $(`#${this.props.id}`).on('chip.delete', (e, chip) => {
      this.handleDeleteTag(chip.tag);
    });
  }
  initializeOptions() {
    const tags = this.props.selectedTags.map(tag => {
      return { tag: tag.name };
    });
    const options = {};
    for(const key in this.props.tags) {
      options[key] = this.props.tags[key].picture
    }
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
  }
  handleAddTag(tagName) {
    const newField = { name: tagName, id: this.props.tags[tagName].id };
    const selectedNew = this.props.selectedTags.concat(newField);
    this.props.onChange(selectedNew);
  }
  handleDeleteTag(tag) {
    const selectedNew = this.props.selectedTags.filter((d) => {
      return d.name !== tag;
    });
    this.props.onChange(selectedNew);
  }
  render() {
    if (typeof document !== 'undefined') {
      this.initializeOptions(); // Need this in render because props are dynamically loaded
    }
    return (
      <div className="row">
        <div className="col s12 m12 l12">
          <label>{this.props.label}</label>
          <div className="chips" id={this.props.id} />
        </div>
      </div>
    );
  }
}
InputTags.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  tags: PropTypes.object,
  selectedTags: PropTypes.array,
}
InputTags.defaultProps = {
  tags: {name: {picture: '', id: ''}},
  selectedTags: [{name: '', id: ''}]
}
