import express from 'express';
import path from 'path';
import { connection } from './DbConnection';
import { useApi } from './Api';

const app = express();
const port = 3001;

app.use(express.static(path.resolve(__dirname, '../../client/build')));
app.use(express.json());

useApi(app);

app.get('*', (req, res) => {
  var indexPath = path.resolve(__dirname, '../../client/build', 'index.html');
  res.sendFile(indexPath);
});

app.listen(port, () => {
  connection.connect();
  console.log(`App listening at http://localhost:${port}`)
});