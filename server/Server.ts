import express from 'express';
import { generateData } from './Data';
import mysql from 'mysql';
const app = express();
const port = 3001;

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'nsadminapp',
  password: 'nsadminapp',
  database: 'ns_admin_app'
})

app.get('/api/data', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    console.log('The solution is: ', rows[0].solution)
  });
  const data = generateData(100, 10);
  res.json(data);
});

app.listen(port, () => {
  connection.connect();
  console.log(`Example app listening at http://localhost:${port}`)
});