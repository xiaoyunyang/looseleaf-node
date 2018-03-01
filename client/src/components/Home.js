import React from 'react';

class Home extends React.Component {
  state = {
    response: 'Loading...'
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <h1 className="App-title">Welcome to React!</h1>
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}


export default Home;
