import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

export default class Reaction extends React.Component {
  componentDidMount() {
    $('.tooltipped').tooltip();
  }
  handleReactNumClick() {
    // TODO: What's the difference between handleReactNumClick and handleReactionNumClick?
    // Both are from props.
    this.props.handleReactNumClick(this.props.label);
  }
  render() {
    return (
      <span>
        <button
          className="tooltipped"
          data-position="top"
          data-delay="50"
          data-tooltip={this.props.label}
          onClick={this.props.handleReactClick}
        >
          {
            this.props.userHasReacted ?
              <i className={`fas fa-${this.props.faName}`} />
              :
              <i className={`far fa-${this.props.faName}`} />
          }
        </button>
        {
          this.props.showNumReacted &&
          <button
            onClick={this.props.handleReactionNumClick}
            style={{ marginLeft: -20 }}
          >
            {this.props.numReacted}
          </button>
        }
      </span>
    );
  }
}
Reaction.propTypes = {
  showNumReacted: PropTypes.bool,
  numReacted: PropTypes.number.isRequired,
  handleReactionNumClick: PropTypes.func.isRequired,
  handleReactClick: PropTypes.func.isRequired,
  handleReactNumClick: PropTypes.func.isRequired,
  userHasReacted: PropTypes.bool.isRequired,
  faName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
Reaction.defaultProps = {
  showNumReacted: true
};
