import express from 'express';
import { generateData } from './Data';
import path from 'path';
import { connection } from './DbConnection';
import PersonRepository from './Repositories/PersonRepository';
import AggregateRepository from './Repositories/AggregateRepository';
import GroupRepository from './Repositories/GroupRepository';
const app = express();
const port = 3001;


app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());

app.get('/api/mysql', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    res.json(rows[0].solution);
  });
});

app.get('/api/data', (req, res) => {
  // const data = generateData(100, 10);
  // res.json(data);

  AggregateRepository.get((err, data) => {
    if (err) {
      res.status(500).send();
    } else {
      res.json(data);
    }
  });
});

app.post('/api/person', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const jobTitle = req.body.jobTitle;

  PersonRepository.add(firstName, lastName, jobTitle, (err, data) => {
    if (err) {
      res.status(500).send();
    } else {
      res.json(data);
    }
  })
});

app.post('/api/group', (req, res) => {
  const name = req.body.name;

  GroupRepository.add(name, (err, data) => {
    if (err) {
      res.status(500).send();
    } else {
      res.json(data);
    }
  })
});

app.get('*', (req, res) => {
  var indexPath = path.resolve(__dirname, '../client/build', 'index.html');
  res.sendFile(indexPath);
});

app.listen(port, () => {
  connection.connect();
  console.log(`Example app listening at http://localhost:${port}`)
});