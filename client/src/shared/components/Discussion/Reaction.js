import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

export default class Reaction extends React.Component {
  componentDidMount() {
    $(document).ready(function(){
      $('.tooltipped').tooltip();
    });
  }
  handleClick() {
    // if loggedin, handleClick per parent component.
    // otherwise, get user to login / signup.
    if(!this.props.readOnly) {
      this.props.handleClick();
    }
  }
  render() {
    return (
      <span>
        <a
          className="tooltipped"
          data-position="top"
          data-delay="50"
          data-tooltip={this.props.label}
          onClick={this.handleClick.bind(this)}>
          {
            this.props.userHasReacted ?
            <i className={`fas fa-${this.props.faName}`}></i>
            :
            <i className={`far fa-${this.props.faName}`}></i>
          }
        </a>
        <a href='' style={{marginLeft: -20}}>
          {this.props.numReacted}
        </a>
      </span>
    );
  }
}
