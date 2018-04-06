import React from 'react';
import fetch from 'isomorphic-fetch';
import $ from 'jquery';
import marked from 'marked';

export default class MdText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mdData: this.loadData(this.props.filepath) // path to the md file
    }
  }
  loadData(filepath) {
    $.ajax({
      url: filepath,
      success: function(data) {
        this.setState({
          mdData: data
        })
        let html_content = marked( data );
        document.getElementById(this.props.mdId).innerHTML = html_content;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  }
  render() {
    return (
      <div id={this.props.mdId}>
        {this.mdData}
      </div>
    )
  }
}
