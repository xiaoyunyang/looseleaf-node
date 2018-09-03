import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { apiLink } from '../../data/apiLinks';
import { deleteFromApiData } from '../../../lib/helpers';

export default class PostEditMenu extends React.Component {
  componentDidMount() {
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      hover: false, // Activate on hover
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      stopPropagation: false // Stops event propagation
    });
  }
  handleDeleteClick(postId) {
    const url = apiLink.postById(postId);
    const cbFailure = () => {};
    const cbSuccess = () =>  {
      this.props.deletePost(postId);
    };
    deleteFromApiData(url, cbFailure, cbSuccess);
  }
  render() {
    return (
      <div className="right" style={{maxWidth: 35}}>
        <a className="dropdown-button" data-activates={`post-edit-dropdown-${this.props.postId}`}>
          <i className="material-icons grey-text text-darken-4">more_vertical</i>
        </a>
        <ul id={`post-edit-dropdown-${this.props.postId}`} className="dropdown-content">
          <li><a>
            <span><i className="far fa-edit"/></span>Edit</a>
          </li>
          <li><a onClick={this.handleDeleteClick.bind(this, this.props.postId)}>
            <span><i className="far fa-trash-alt"/></span>Delete</a>
          </li>
        </ul>
      </div>
    );
  }
}
