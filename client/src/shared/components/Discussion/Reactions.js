import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Reaction from './Reaction';
import { appLink, apiLink } from '../../data/apiLinks';
import { postToApiData, copyToClipboard, updateItems } from '../../../lib/helpers';

import { LoginModal, SignupModal } from '../Login/Modal';


const userHasReacted = (loggedinUser, reactedUsers) => {
  if(!loggedinUser) {
    return false;
  }
  return reactedUsers.includes(loggedinUser._id);
}

export default class Reactions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hearts: this.props.post.hearts,
      thumbUps: this.props.post.thumbUps,
      comments: this.props.post.comments
    }
    this.handleReactionClick = this.handleReactionClick.bind(this);
    this.handleShareClick = this.handleShareClick.bind(this);
    this.handleCommentsClick = this.handleCommentsClick.bind(this);
  }
  componentDidMount() {
    $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: 0.5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '80px' // Ending top style attribute
    });
  }
  handleReactionClick(reaction) {
    // if loggedin, handleClick per parent component.
    // otherwise, get user to login / signup.
    if (this.props.loggedinUser) {
      this.handlePostReaction(reaction);
    } else {
      // Open Modal
      $('#login-modal').modal('open');
    }
  }
  handlePostReaction(reaction) {
    // reaction may be "hearts", thumbUps, "comments"
    // action may be "add" or "remove"
    const userId = this.props.loggedinUser._id;
    const postId = this.props.post._id;

    const postUrl = apiLink.postReaction(postId, reaction);

    const reactedUsers = this.state[reaction];

    const updatedReaction = {};
    updatedReaction[reaction] = updateItems(reactedUsers, userId);
    const data = { updatedReaction };

    const cbFailure = (status, msg) => {};
    const cbSucess = (status, msg) => {
      this.setState(updatedReaction)
    }
    postToApiData(postUrl, data, cbFailure, cbSucess);
  }
  handleCommentsClick() {
    const postLink = appLink.postById(this.props.post._id);
    window.location = postLink;
  }
  handleShareClick() {
    const postLink = appLink.postById(this.props.post._id);
    copyToClipboard(postLink);
    // TODO: later
    // const toWait = 3000; // 3 seconds
    // this.setState({
    //   showCopied: true
    // });
    // setTimeout(() => this.setState({
    //   showCopied: false
    // }),
    // toWait);
  }
  render() {
    const location = (typeof document !== 'undefined') ? document.location.pathname : undefined;
    const readOnly = !this.props.loggedinUser;
    return (
      <div className="post-reactions">
      {
        this.props.post &&
        <div>
          <Reaction
            faName='heart'
            label='Heart'
            userHasReacted={userHasReacted(this.props.loggedinUser, this.state.hearts)}
            readOnly={readOnly}
            numReacted={this.state.hearts.length}
            handleClick={action => this.handleReactionClick('hearts', action)}
          />
          <Reaction
            faName='thumbs-up'
            label='Great Job'
            userHasReacted={userHasReacted(this.props.loggedinUser, this.state.thumbUps)}
            readOnly={readOnly}
            numReacted={this.state.thumbUps.length}
            handleClick={action => this.handleReactionClick('thumbUps', action)}
          />
          <Reaction
            faName='comments'
            label='Comments'
            userHasReacted={false}
            readOnly={readOnly}
            numReacted={this.state.comments.length}
            handleClick={this.handleCommentsClick}
          />
          <Reaction
            faName='share-square'
            label={'Click to copy link to the post for sharing'}
            readOnly={readOnly}
            userHasReacted={true}
            onClick={this.handleShareClick}
          />
        </div>
      }
      {
        this.props.readOnly &&
        <div>
          <LoginModal redirPath={location} />
          <SignupModal redirPath={location} />
        </div>
      }

      </div>
    );
  }
}

Reactions.propTypes = {
  post: PropTypes.object,
  loggedinUser: PropTypes.object,
}
