import React from 'react';
import TopNav from '../TopNav';
import { randomUserPic } from '../../../lib/helpers';

const list = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: 0,
      userPic: ''
    }
  }
  componentWillMount() {
    this.setState({
      userPic: randomUserPic()
    })
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
        <img src={this.state.userPic} alt="" className="circle" />
        <span className="title">{this.props.title}</span>
        <p>First Line</p>
        <p>Second Line</p>
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
        <h4>Developers</h4>
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
