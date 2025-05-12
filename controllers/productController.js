const { Pool } = require("pg");

const db = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_z7tYWyoBfUJ5@ep-old-sea-a4qke7ww-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require'
})

exports.product = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM product");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
};
