//gerekli paketlerin ve modüllerin yüklenmesi
import http from 'http'
import express from 'express'
import cors from 'cors'
import UserRouter from './api/routes/user.js'
import CounterRouter from './api/routes/counter.js'
import { databaseconnection } from './database.js'

import bodyParser from 'body-parser';
// import expressSwagger from './api/swagger.js'

import cookieParser from 'cookie-parser';
import sessions from 'express-session';



import { fileURLToPath } from 'url';
import { dirname } from 'path';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

// const expressSwagger = require('express-swagger-generator')(app);
const app = express()

import expressSwagger from 'express-swagger-generator';

app.use(cookieParser());
const corsOptions = {
	origin: 'http://localhost:4000', 
	credentials: true
};

// expressSwagger(app);

// önyüzden gelebilecek isteklere izin vermek için CORS eklentisi
app.use(cors())

app.use(sessions(
	{ name: 'SessionCookie',
		secret: 'Shsh!Secret!',
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 5 * 60000 }
		 
	}));

const server = http.createServer(app)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json());

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
  console.log('App listening at http://localhost:4000')
})

export default server

// These lines make "require" available
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);