import React from 'react';
import marked from 'marked';
import axios from 'axios';

export default class MdText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mdData: this.loadData(this.props.filepath) // path to the md file
    };
  }
  saveData(response) {
    this.setState({
      mdData: response.data
    });
    let html_content = marked(response.data);
    document.getElementById(this.props.mdId).innerHTML = html_content;
  }
  loadData(filepath) {
    axios.get(filepath)
      .then(response => this.saveData(response))
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div id={this.props.mdId}>
        {this.mdData}
      </div>
    );
  }
}
