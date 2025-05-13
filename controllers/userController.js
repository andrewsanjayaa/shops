const db = require("../db");
const { v4: uuidv4 } = require("uuid");

exports.createUser = async (req, res) => {
  const { username, userrole, userpassword } = req.body;

  try {
    const date_created = new Date();
    const date_updated = new Date();
    const query =
      "INSERT INTO users (username, password, roles, date_created, date_updated) VALUES ($1, $2, $3, $4, $5)";

    await db.query(query, [
      username,
      userpassword,
      userrole,
      date_created,
      date_updated,
    ]);
    res.redirect("/admin.html?msg=User+berhasil+disimpan");
  } catch (error) {
    console.error("Error saat insert:", error);
    res.status(500).send("Terjadi kesalahan saat menyimpan user.");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
};
