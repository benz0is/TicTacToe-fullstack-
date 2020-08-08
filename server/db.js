const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "admin",
  database: "postgres",
  host: "db",
  port: 5432,
});

module.exports = pool;
