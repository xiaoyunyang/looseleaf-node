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
  componentDidMount() {
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
    console.log('rendering: Home');
    return (
      <div>
        <TopNav route={this.props.route}/>
        <div className="container">
          <h1>Help Wanted</h1>
          <h6>
            {`Message from the server: ${this.state.resHello}`}
          </h6>
        </div>
      </div>
    );
  }
}

export default Home;
