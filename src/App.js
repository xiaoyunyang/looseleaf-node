import React from 'react'
import Header from './components/Header'
import Main from './components/Main'
import { BrowserRouter } from 'react-router-dom'

const App = () => (
	<BrowserRouter>
		<div>
			<Header />
			<Main />
		</div>
	</BrowserRouter>

)

export default App
