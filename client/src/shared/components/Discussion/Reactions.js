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
      showComment: this.props.showComment
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
    const revealed = this.props.handleToggleShowComment();
    this.setState({
      showComment: revealed
    });
  }
  handleShareClick() {
    const postLink = appLink.postById(this.props.post._id);
    window.location = postLink;
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
            label={`${this.state.showComment ? 'Hide' : 'See'} Comments`}
            userHasReacted={this.state.showComment}
            readOnly={readOnly}
            numReacted={this.props.commentNum}
            handleClick={this.handleCommentsClick}
          />
          <Reaction
            faName='share-square'
            label='Open post on own page'
            readOnly={readOnly}
            userHasReacted={true}
            handleClick={this.handleShareClick}
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
