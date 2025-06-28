const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Restaurant_System",
  password: "Noooo4321",
  port: 5432,
});

module.exports = pool;
