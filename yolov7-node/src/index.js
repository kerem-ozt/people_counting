//gerekli paketlerin ve modüllerin yüklenmesi
import http from 'http'
import express from 'express'
import cors from 'cors'
import admin from 'firebase-admin'
import UserRouter from './api/routes/user.js'
import { onnxruntime } from './utils/onnxruntime.js'
import { databaseconnection } from './database.js'

const app = express()

// önyüzden gelebilecek isteklere izin vermek için CORS eklentisi
app.use(cors())
const server = http.createServer(app)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

databaseconnection();

app.use('/user', UserRouter);

// app.post('/signup', async (req, res) => {
//   const user = {
//     email: req.body.email,
//     password: req.body.password
//   }
//   const userResponse = await admin.auth().createUser({
//     email: user.email,
//     password: user.password,
//     emailVerified: false,
//     disabled: false
//   })
//   res.json(userResponse)
// })

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log('Example app listening at http://localhost:4000')
})

export default server

onnxruntime();

// These lines make "require" available
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);