import express from 'express';
import { generateData } from './Data';
import mysql from 'mysql';
import path from 'path';
const app = express();
const port = 3001;

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'nsadminapp',
  password: 'nsadminapp',
  database: 'ns_admin_app'
})

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api/data', (req, res) => {
  const data = generateData(100, 10);
  res.json(data);
});

app.get('/api/mysql', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    res.json(rows[0].solution);
  });
});

app.get('*', (req, res) => {
  var indexPath = path.resolve(__dirname, '../client/build', 'index.html');
  res.sendFile(indexPath);
});

app.listen(port, () => {
  connection.connect();
  console.log(`Example app listening at http://localhost:${port}`)
});