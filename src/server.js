import express from 'express';
import pool from './db.js';
import path from 'path';



const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.resolve('src/index.html'));
});

app.get('/setup', async (req, res) => {
  const qryGames = `CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY, 
    title TEXT, 
    date DATE, 
    location TEXT, 
    description TEXT
  )`;

  const qryPlayers = `CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY, 
    name TEXT,
    email TEXT,
    game_id INTEGER REFERENCES games(id),
    status TEXT DEFAULT 'invited'
  )`;

  const addGames = `INSERT INTO games (title, date, location, description)
                     VALUES ('Game 1', '2025-09-01', 'Auckland', 'First Game'),
                            ('Game 2', '2025-09-02', 'Wellington', 'Second Game'),
                            ('Game 3', '2025-09-03', 'Christchurch', 'Third Game'),
                            ('Game 4', '2025-09-04', 'Hamilton', 'Fourth Game'),
                            ('Game 5', '2025-09-05', 'Dunedin', 'Fifth Game')`

  try {
    await pool.query(qryGames);
    await pool.query(qryPlayers);
    await pool.query(addGames);
    return res.sendStatus(200);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }

});



app.post('/games', async (req, res) => {
  const {title, date, location, description} = req.body;
  const qry = 'INSERT INTO games (title, date, location, description) VALUES ($1, $2, $3, $4)';
  const values = [title, date, location, description];
  try {
    const result = await pool.query(qry, values);
    console.log(result);
    return res.sendStatus(200);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/games', async (req, res) => {
  const qry = 'SELECT * FROM games';
  try {
    const { rows } = await pool.query(qry);
    console.log(rows);
    return res.status(200).json(rows);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/games/:id', async (req, res) => {
  const { id } = req.params;
  const qryGames = 'SELECT * FROM games WHERE id = $1';
  const qryPlayers = 'SELECT name, email, status FROM players WHERE game_id = $1';
  try {
    const [game, players] = await Promise.all([
      pool.query(qryGames, [id]),
      pool.query(qryPlayers, [id]),
    ]);
    const result = {
      game: game.rows[0],
      players: players.rows,
    };
    return res.status(200).json(result);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/games/:id/players', (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  const qry = 'INSERT INTO players (name, email, game_id) VALUES ($1, $2, $3)';
  const values = [name, email, id];
  try {
    const result = pool.query(qry, values);
    console.log(result);
    return res.status(200).send('Player added to game');
  } catch(error) {
    console.log(error);
    res.status(500).send('Error adding player to game');
  }
});

app.patch('/games/:id/players/:playerid', (req, res) => {
  const { playerid } = req.params;
  const { status } = req.body;
  const qry = 'UPDATE players SET status = $1 WHERE id = $2';
  const values = [status, playerid];  
  try {
    const result = pool.query(qry, values);
    console.log(result);
    return res.status(200).send('Player status updated');
  } catch(error) {
    console.log(error);
    res.status(500).send('Error updating player status');
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});