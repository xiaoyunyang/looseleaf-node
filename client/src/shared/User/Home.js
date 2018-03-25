import React from 'react';
import fetch from 'isomorphic-fetch';
import TopNav from './TopNav';

// This is a ES6 class - see https://toddmotto.com/react-create-class-versus-component/
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resHello: 'Loading...'
    };
  }
  componentDidlMount() {
    // Get hello message
    this.callApi('http://localhost:3001/api/hello')
      .then(res => this.setState({ resHello: res.express }))
      .catch(err => console.log(err));
  }
  callApi = async function (endpoint) {
    const response = await fetch(endpoint);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    return (
      <div>
        <TopNav route={this.props.route} user={this.props.user}/>
        <div className="container">
          <h1>{`Welcome ${this.props.user.username} `}</h1>
          <a className="btn" href="">Start a project</a>
          <h6>
            {`Message from the server: ${this.state.resHello}`}
          </h6>
          <h2>Help Wanted</h2>
        </div>
      </div>
    );
  }
}

export default Home;
