import React from 'react';
import { getApiData } from '../../../lib/helpers';
import { apiLink } from '../../data/apiLinks';
import Users from '../Collection/Users';

export const reactionIcon = type => {
  switch (type) {
    case 'hearts': return { className: 'fas fa-heart', label: 'Great Job' };
    case 'thumbUps': return { className: 'fas fa-thumbs-up', label: 'Heart' };
    default: return '';
  }
}

export default class ReactionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {
        hearts: [],
        thumbUps: []
      }
    }
  }
  componentDidMount() {
    this.fetchUsers('hearts', this.props.reacted.hearts);
    this.fetchUsers('thumbUps', this.props.reacted.thumbUps);
  }
  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps.reacted.hearts) !== JSON.stringify(this.props.reacted.hearts)) {
      this.fetchUsers('hearts', nextProps.reacted.hearts);
    }
    if(JSON.stringify(nextProps.reacted.thumbUps) !== JSON.stringify(this.props.reacted.thumbUps)) {
      this.fetchUsers('thumbUps', nextProps.reacted.thumbUps);
    }
  }
  fetchUsers(reaction, reactedTo) {
    // NOTE: reaction is string, reactedTo is array
    const updatedUsers = {...this.state.users};
    if (reactedTo.length === 0) {
      updatedUsers[reaction] = [];
      this.setState({
        users: updatedUsers
      });
      return;
    }
    const setApiData = data => {
      updatedUsers[reaction] = data;
      this.setState({
        users: updatedUsers
      });
    }
    getApiData(apiLink.usersByIds(reactedTo), setApiData);
  }
  render() {
    const {postId, reaction} = this.props.modalReaction;
    return (
      <div id={`reaction-modal-${postId}`} className="modal" style={{maxHeight: '90vh', top: '5vh'}}>
        <div className="modal-content reaction-modal">
          <p><i className={reactionIcon(reaction).className}/>{reaction}</p>
          {
            this.state.users[reaction].length === 0 ? <p>{`No ${reaction}`}</p>
            :
            <Users users={this.state.users[reaction]} showBio={false} />
          }
        </div>
      </div>
    )
  }
}
