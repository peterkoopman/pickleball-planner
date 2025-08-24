import {Pool} from 'pg'

const pool = new Pool({
  host: 'db',
  port: 5432,
  user: 'pguser',
  password: 'password',
  database: 'pickleball_db'
});

export default pool;