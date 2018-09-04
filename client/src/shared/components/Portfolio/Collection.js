import React from 'react';
import PropTypes from 'prop-types';

const list = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

export default class Collection extends React.Component {
  static defaultProps = {
    data: list
  }
  render() {
    return (
      <ul className="collection">
        {
          this.props.data.map((d, i) => {
            return (
              <li key={i} className="collection-item avatar">
                <img src="https://cs3design.com/wp-content/uploads/2017/04/checkmark.png" alt="" className="circle" />
                <span className="title">{d}</span>
                <p>First Line</p>
                <p>Second Line</p>
                <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

Collection.propTypes = {
  data: PropTypes.array
};
