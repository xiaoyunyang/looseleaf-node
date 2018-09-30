import React from 'react';
import marked from 'marked';
import axios from 'axios';

export default class MdText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mdData: this.loadData(this.props.filepath), // path to the md file
      clientModeOn: false
    };
  }
  componentDidMount() {
    this.setState({
      clientModeOn: true
    });
  }
  saveData(response) {
    this.setState({
      mdData: response.data
    });
    const htmlContent = marked(response.data);
    if (this.state.clientModeOn) {
      document.getElementById(this.props.mdId).innerHTML = htmlContent;
    }
  }
  loadData(filepath) {
    axios.get(filepath)
    .then(response => this.saveData(response))
    .catch(function(error) {
      console.log(error)
    });
  }
  render() {
    return (
      <div id={this.props.mdId}>
        {this.state.mdData}
      </div>
    )
  }
}
