const db = require("../db");
const fs = require("fs");
const path = require("path");

exports.testimoni = async (req, res) => {
  try {
    const result = await db.query("SELECT testimoni.*, product.name FROM testimoni join product on testimoni.id_product = product.id");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

exports.getTestimoni = async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await db.query("SELECT testimoni.*, product.name FROM testimoni WHERE id = $1 join product on testimoni.id_product = product.id", [
      productId,
    ]);
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
  }
};