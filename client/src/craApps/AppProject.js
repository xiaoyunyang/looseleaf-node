import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../shared/Project/App';
import { hot } from 'react-hot-loader';

import configureStore from '../shared/redux/Project/configureStoreCRA';

const store = configureStore();

// class AppProject2 extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       res: 'loading',
//       store: 'loading',
//     };
//   }
//   componentDidMount() {
//    this.callApi('http://localhost:3001/api/hello-recipe')
//       .then(res => {
//         console.log('res', res);
//         this.setState({res: res})
//         this.setState({store: initRedux(res)})
//         }
//       )
//       .catch(err => console.log(err));
//   }
//   callApi = async function (endpoint) {
//     // console.log(this)
//     const response = await fetch(endpoint);
//     const body = await response.json();
//
//     if (response.status !== 200) throw Error(body.message);
//
//     return body;
//   }
//   renderHelper() {
//     if(this.state.store === 'loading') {
//       return <h1>Loading</h1>
//     }
//     return (
//       <Provider store={this.state.store}>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </Provider>
//     )
//   }
//   render() {
//     console.log('this.state.res', this.state.res);
//     console.log('this.state.store', this.state.store);
//
//     return this.renderHelper();
//   }
// }


const AppProject = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

export default hot(module)(AppProject);
