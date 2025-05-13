const db = require("../db");

exports.product = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM product");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
};
