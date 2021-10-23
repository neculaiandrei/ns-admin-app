import express from 'express';
import { generateData } from './Data';
const app = express();
const port = 3001;

app.get('/api/data', (req, res) => {
  const data = generateData(100, 10);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});