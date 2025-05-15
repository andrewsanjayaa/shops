const { Pool } = require("pg");

const db = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_z7tYWyoBfUJ5@ep-old-sea-a4qke7ww-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
  ssl: {
    rejectUnauthorized: false, // untuk development
  }
});

module.exports = db;
