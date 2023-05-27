//gerekli paketlerin ve modüllerin yüklenmesi
import http from 'http'
import express from 'express'
import cors from 'cors'
import UserRouter from './api/routes/user.js'
import CounterRouter from './api/routes/counter.js'
import { databaseconnection } from './database.js'
// import expressSwagger from './api/swagger.js'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

// const expressSwagger = require('express-swagger-generator')(app);
const app = express()

import expressSwagger from 'express-swagger-generator';


// expressSwagger(app);

// önyüzden gelebilecek isteklere izin vermek için CORS eklentisi
app.use(cors())
const server = http.createServer(app)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

databaseconnection();

let options = {
	swaggerDefinition: {
		info: {
			description: 'Customer - Order - Item',
			title: 'Customer - Order - Item',
			version: '1.0.0'
		},
		host: 'localhost:4000',
		basePath: '',
		produces: [
			'application/json',
			'application/xml'
		],
		schemes: [ 'http', 'https' ],
		security: [
			{
				JWT: [],
				language: []
			}
		],
		securityDefinitions: {
			JWT: {
				type: 'apiKey',
				in: 'header',
				name: 'Authorization',
				description: ''
			},
			language: {
				type: 'apiKey',
				in: 'header',
				name: 'language'
			}
		}
	},
	basedir: currentDirPath,  
  files: [ './**/*.js' ]
};
expressSwagger(app)(options);

app.use('/user', UserRouter);
app.use('/counter', CounterRouter);

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log('Example app listening at http://localhost:4000')
})

export default server

// These lines make "require" available
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);