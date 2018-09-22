import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

export default class Reaction extends React.Component {
  componentDidMount() {
    $('.tooltipped').tooltip();
  }
  handleReactNumClick() {
    this.props.handleReactNumClick(this.props.label);
  }
  render() {
    return (
      <span>
        <a
          className="tooltipped"
          data-position="top"
          data-delay="50"
          data-tooltip={this.props.label}
          onClick={this.props.handleReactClick}>
          {
            this.props.userHasReacted ?
            <i className={`fas fa-${this.props.faName}`}></i>
            :
            <i className={`far fa-${this.props.faName}`}></i>
          }
        </a>
        {
          this.props.showNumReacted &&
          <a
            onClick={this.props.handleReactionNumClick}
            style={{marginLeft: -20}}
          >
            {this.props.numReacted}
          </a>
        }
      </span>
    );
  }
}
Reaction.propTypes = {
  showNumReacted: PropTypes.bool
}
Reaction.defaultProps = {
  showNumReacted: true
}
