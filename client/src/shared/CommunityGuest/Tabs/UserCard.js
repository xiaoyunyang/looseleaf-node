import React from 'react';
import { randomUser } from '../../../lib/helpers';

export default class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: 0,
      user: {}
    }
  }
  componentWillMount() {
    randomUser(u => this.setState({user: u}))
  }
  getIconName(option) {
    const options = ['star_border', 'grade']
    return options[option % 2]; // mod 2 again just to be safe
  }
  toggleStar(option) {
    const newOption = (option + 1) % 2;
    this.setState({
      option: newOption
    })
  }
  render() {
    return (
      <li className="collection-item avatar">
        <img src={this.state.user.picture} alt="" className="circle" />
        <span className="title">
          <a href="/">
            {`${this.state.user.firstname} ${this.state.user.lastname}`}
          </a>
        </span>
        <p>{`Completed ${this.props.user.stats.numProj} projects in the past ${this.props.user.stats.numMonths} months`}</p>
        <p>{`Won best project ${this.props.user.stats.numBest} times`}</p>
        <a href="#!" className="secondary-content" onClick={this.toggleStar.bind(this, this.state.option)}>
          <i className="material-icons">{this.getIconName(this.state.option)}</i>
        </a>
      </li>
    )
  }
}
