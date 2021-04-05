const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser');

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())

app.use(express.static('./public'))

const router_user = require('./routes/user.js')
app.use(router_user)

// app.get('/', (request, response) => {
//   response.send('Welcome')
// })

app.listen(3333, () => {
  console.log('The server is up and listening on port 3333')
})
