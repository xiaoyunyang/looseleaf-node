import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Header from './components/Header'
import Main from './components/Main'
import configureStore from './store/configureStore';

const store = configureStore(window.INITIAL_STATE);

/*
 * App
 * caller: index.js
 */
const App = () => (
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Header />
				<Main />
			</div>
		</BrowserRouter>
	</Provider>

)

export default App
