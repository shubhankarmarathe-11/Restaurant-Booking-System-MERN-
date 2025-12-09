import { Pool } from "pg";
const pool = new Pool({
  user: "your_username",
  password: "your_password",
  host: "localhost",
  port: 5432, // default Postgres port
  database: "your_database_name",
});

const query = async (text, params) => pool.query(text, params);

export { query };
