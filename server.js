import fs from 'fs';
import path from 'path'
import express from 'express'
import React from 'react'
import ReactDOMServer, { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import App from './src/App'
import routes from './src/routes'

const app = express()
const viewPath = process.env.DEVELOPMENT ? 'view' : 'build'

// Set view engine & serve static assets
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, viewPath))
app.use(express.static(path.join(__dirname, 'build')))

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
	const branch = matchRoutes(routes, req.url)
	const promises = []

	branch.forEach( ({route, match}) => {
		if (route.loadData)
			promises.push(route.loadData(match))
	})

	Promise.all(promises).then(data => {
		// data will be an array[] of datas returned by each promises.
		// console.log(data)

		const context = data.reduce( (context, data) => {
			return Object.assign(context, data)
		}, {})

		const html = renderToString(
			<StaticRouter location={req.url} context={context} >
				<App/>
			</StaticRouter>
		)

		if(context.url) {
			res.writeHead(301, {Location: context.url})
			res.end()
		}
		return res.render('index', {html})
	})
})

// Run server
const port = process.env.PORT || 3000
app.listen(port, err => {
	if (err) return console.error(err)
	console.log(`Server listening at http://localhost:${port}`)
})
