import React from 'react';
import { Provider } from 'react-redux';
import App from '../shared/Recipe/App';
import { hot } from 'react-hot-loader';
import initRedux from '../shared/redux/Recipe/init-redux';
import fetch from 'isomorphic-fetch';


class AppRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: 'loading',
      store: 'loading',
    };
  }
  componentDidMount() {
   this.callApi('http://localhost:3001/api/hello-recipe')
      .then(res => {
        console.log('res', res);
        this.setState({res: res})
        this.setState({store: initRedux(res)})
        }
      )
      .catch(err => console.log(err));
  }
  callApi = async function (endpoint) {
    // console.log(this)
    const response = await fetch(endpoint);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }
  renderHelper() {
    if(this.state.store === 'loading') {
      return <h1>Loading</h1>
    }
    return (
      <Provider store={this.state.store}>
        <App />
      </Provider>
    )
  }
  render() {
    console.log('this.state.res', this.state.res);
    console.log('this.state.store', this.state.store);

    return this.renderHelper();
  }
}
export default hot(module)(AppRecipe);
