import express from 'express';
import pool from './db.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/games', (req, res) => {
  res.send('Game created');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});