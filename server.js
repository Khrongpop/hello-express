const express = require('express')
var port = process.env.PORT || 3000;
const app = express()

const books = require('./db')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const mysql = require('mysql')
const db = mysql.createConnection({   // config ค่าการเชื่อมต่อฐานข้อมูล
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bandsquare_tbl'
})

// db.connect() // เชื่อมต่อฐานข้อมูล

app.get('/', (req, res) => {
  res.send('Hello World')
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