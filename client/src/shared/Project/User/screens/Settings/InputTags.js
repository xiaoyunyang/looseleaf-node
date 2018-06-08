import React from 'react';
import $ from 'jquery';

export default class InputTags extends React.Component {

  componentDidMount() {
    let tags = this.props.selectedTags.map(function(d) {
      return {tag: d};
    });
    let options = this.props.tags.map(function(d) {
      var tmp = {};
      tmp[d] = null;
      return tmp;
    }).reduce(function(acc, x) {
      for (var key in x) acc[key] = x[key];
      return acc;
    }, {});

    $(document).ready(function(){
      $('#'+this.props.id).material_chip({
        data: tags,
        placeholder: this.props.label,
        secondaryPlaceholder: this.props.hint,
        autocompleteOptions: {
          data: options,
          limit: Infinity,
          minLength: 1
        }
      });
    }.bind(this))

    $('#'+this.props.id).on('chip.add', function(e, chip){
      this.handleAddTag(chip.tag);
    }.bind(this));
    $('#'+this.props.id).on('chip.delete', function(e, chip){
      this.handleDeleteTag(chip.tag);
    }.bind(this));

  }

  handleAddTag(tag) {
    var selectedNew = this.props.selectedTags.concat(tag);
    this.props.setState(selectedNew);
  }
  handleDeleteTag(tag) {
    var selectedNew = this.props.selectedTags.filter(function(d){
      return d !== tag;
    });
    this.props.setState(selectedNew);
  }
  render() {
    return (
      <div className="col s12 m12 l12">
        <label>{this.props.label}</label>
        <div className="chips" id={this.props.id}></div>
      </div>
    );
  }
}
