const { query } = require('express')
const express = require('express')
const router = express.Router()

const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 5,
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: '202101-IM215-REST',
});

function getNewConnection() {
  return pool
}


router.get('/user', (request, response) => {

  const connection = getNewConnection();
  const queryString = 'Select * FROM user'

  connection.query(queryString, (err, rows, fields) => {
    if (err != null) {
      console.error(err)
      response.sendStatus(500);
    } else {
      response.json(rows);
    }
  })
})

router.get('/user/:id', (request, response) => {
  const {id} = request.params 
  const connection = getNewConnection();
  const queryString = `Select * FROM user where id = ${id}`

  connection.query(queryString, (err, rows, fields) => {
    if (err != null) {
      console.error(err)
      response.sendStatus(500);
    } else {
      response.json(rows[0]);
    }
  }) 
})

router.post('/user', (request, response) => {

  const {first_name, last_name, age} = request.body
  const queryString = `INSERT INTO user VALUES (NULL, '${first_name}', '${last_name}', ${age})`

  const connection = getNewConnection()
  connection.query(queryString, (err, result, fields) => {
    console.log('Got a Response from our Database Server')
    if (err != null) {
      console.error(err)
      response.sendStatus(500);
    } else {
      console.log(result)
      response.json({id: result.insertId})
    }
  })
})

router.delete('/user/:id', (request, response) => {
  const {id} = request.params

  const connection = getNewConnection();
  const queryString = `Delete FROM user where id = ${id}`

  connection.query(queryString, (err, result, fields) => {
    if (err != null) {
      console.error(err)
      response.sendStatus(500);
    } else {
      // As exercise check if user was actually removed. 
      console.log(result)
      response.end()
    }
  }) 

  // users.splice(id, 1)
  // response.end()
})


module.exports = router
