import React from 'react';
import PropTypes from 'prop-types';

class FlashNotif extends React.Component {
  static defaultProps = {
    text: 'Error. something wrong with your login'
  }
  renderNotif(state, text) {
    switch(state) {
      case 'error':
        return this.renderError(text)
      default:
        return null;
    }
  }
  renderError(text) {
    return (
      <p style={{color: '#e57373'}}>{text}</p>
    );
  }
  render() {
    return (
      <div className="col l12 m12 s12 center-align">
        { this.renderNotif(this.props.state, this.props.text) }
      </div>
    );
  }
}
FlashNotif.propTypes = {
  state: PropTypes.string.isRequired,
  text: PropTypes.string
}

export default FlashNotif;
