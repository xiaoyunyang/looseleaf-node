import React from 'react'

/*
const Home = () => (
	<div>
		<h2>Home</h2>
		<p>Hello,</p>
		<p>If you are seeing this message, your universal application is properly running. Please keep on checking by cliking the link buttons inside the header, which were generated from the <em>Link</em> element of React Router.</p>
	</div>
)
*/

class Home extends React.Component {
  state = {
    response: ''
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


export default Home
