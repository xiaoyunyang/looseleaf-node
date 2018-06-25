import React from 'react';
import PropTypes from 'prop-types';

class FlashNotif extends React.Component {
  static defaultProps = {
    msg: 'Error. something wrong with your login'
  }
  renderNotif(state, text) {
    switch(state) {
      case 'error':
        return this.renderError(text)
      default:
        return null;
    }
  }
  renderError(msg) {
    return (
      <p style={{color: '#e57373'}}>{msg}</p>
    );
  }
  render() {
    return (
      <div className="col l12 m12 s12 center-align">
        { this.renderNotif(this.props.state, this.props.msg) }
      </div>
    );
  }
}
FlashNotif.propTypes = {
  state: PropTypes.string.isRequired,
  msg: PropTypes.string
}

export default FlashNotif;
