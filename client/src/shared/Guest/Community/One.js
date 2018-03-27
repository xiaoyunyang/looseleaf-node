import React from 'react';
import $ from 'jquery';
import TopNav from '../TopNav';
import { randomUserPic, randomUser } from '../../../lib/helpers';

const list = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

class Task extends React.Component {
  constructor(props) {
    super(props);
    const rand = Math.random();
    const numProj = Math.ceil(rand * 10);
    const rand2 = Math.random();
    const numMonths = Math.ceil(rand2 * 14);
    const rand3 = Math.random();
    const numBest = Math.floor(rand3 * numProj);
    this.state = {
      option: 0,
      numProj: numProj,
      numMonths: numMonths,
      numBest: numBest,
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
        <span className="title">{`${this.state.user.firstname} ${this.state.user.lastname}`}</span>
        <p>{`Completed ${this.state.numProj} projects in the past ${this.state.numMonths} months`}</p>
        <p>{`Won best project ${this.state.numBest} times`}</p>
        <a href="#!" className="secondary-content" onClick={this.toggleStar.bind(this, this.state.option)}>
          <i className="material-icons">{this.getIconName(this.state.option)}</i>
        </a>
      </li>
    )
  }
}

export default ( {route} ) => (
  <div>
    <TopNav route={route} />
    <div className="container main">
      <div id="one" className="col s12">
        <h4>Aspiring Developers</h4>
        <ul className="collection">
          {
            list.map((d, i) => {
              return (
                <Task key={i} title={d} />
              );
            })
          }
        </ul>
      </div>
    </div>
  </div>

);
