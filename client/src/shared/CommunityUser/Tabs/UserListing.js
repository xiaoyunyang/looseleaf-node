import React from 'react';
import UserCard from './UserCard';

export default class UserListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentWillMount() {
    const users = Array.from(Array(this.props.number).keys()).map(i => {
      return {
        stats: this.randomStats()
      };
    });
    this.setState({ users });
  }
  randomStats() {
    const rand = Math.random();
    const numProj = Math.ceil(rand * 10);
    const rand2 = Math.random();
    const numMonths = Math.ceil(rand2 * 14);
    const rand3 = Math.random();
    const numBest = Math.floor(rand3 * numProj);

    return {
      numProj,
      numMonths,
      numBest
    };
  }
  render() {
    return (
      <ul className="collection">
        {
          this.state.users.map((d, i) => {
            return (
              <UserCard key={i} user={d} title={d} />
            );
          })
        }
      </ul>
    );
  }
}
