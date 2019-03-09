const express = require('express')
var port = process.env.PORT || 3000
const app = express()

const books = require('./db')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// CLEARDB_DATABASE_URL
const mysql = require('mysql')

var port = process.env.PORT || 3000
var CLEARDB_DATABASE_URL = process.env.CLEARDB_DATABASE_URL 
var CLEARDB_DATABASE_HOST = process.env.CLEARDB_DATABASE_HOST || `localhost`
var CLEARDB_DATABASE_USER = process.env.CLEARDB_DATABASE_USER || `root`
var CLEARDB_DATABASE_PASS = process.env.CLEARDB_DATABASE_PASS || ``
var CLEARDB_DATABASE_NAME = process.env.CLEARDB_DATABASE_PASS || `bandsquare_tbl`
const db = mysql.createConnection({   // config ค่าการเชื่อมต่อฐานข้อมูล
  host: CLEARDB_DATABASE_HOST,
  user: CLEARDB_DATABASE_USER,
  password: CLEARDB_DATABASE_PASS,
  database: CLEARDB_DATABASE_NAME
})

db.connect() // เชื่อมต่อฐานข้อมูล

app.get('/', (req, res) => {
  // res.send('Hello World ')
  res.send(JSON.stringify(
    { 
      message: `Hello World`,
      CLEARDB_DATABASE_URL: `${CLEARDB_DATABASE_URL}`
    }
  ));
})

app.get('/books', (req, res) => {
  res.json(books)
})

app.get('/books/:id', (req, res) => {
  res.json(books.find(book => book.id === req.params.id))
})

app.post('/books', (req, res) => {
  books.push(req.body)
  res.status(201).json(req.body)
})

app.put('/books/:id', (req, res) => {
  const updateIndex = books.findIndex(book => book.id === req.params.id)
  res.json(Object.assign(books[updateIndex], req.body))
})

app.delete('/books/:id', (req, res) => {
  const deletedIndex = books.findIndex(book => book.id === req.params.id)
  books.splice(deletedIndex, 1)
  res.status(204).send()
})

// app.get('/users', (req, res) => {   // Router เวลาเรียกใช้งาน
//   let sql = 'SELECT * FROM users'  // คำสั่ง sql
//   let query = db.query(sql, (err, results) => { // สั่ง Query คำสั่ง sql
//     if (err) throw err  // ดัก error
//     console.log(results) // แสดงผล บน Console 
//     res.json(results)   // สร้างผลลัพธ์เป็น JSON ส่งออกไปบน Browser
//   })
// })

app.listen(port, () => {
  console.log(`Start server at port ${port}.`)
})