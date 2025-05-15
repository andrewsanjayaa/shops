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
    const result = await db.query("SELECT * FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await db.query("DELETE FROM users WHERE id = $1", [userId]);
    res.status(200).json({ message: "User berhasil dihapus" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Gagal menghapus user" });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.body.id;
  const { username, userrole, userpassword } = req.body;

  console.log("Request Body:", req.body);
  try {
    const date_updated = new Date();
    const result = await db.query(
      "UPDATE users SET username = $1, password = $2, roles = $3, date_updated = $4 WHERE id = $5",
      [username, userpassword, userrole, date_updated, userId]
    );
    res.redirect("/admin.html?msg=User+berhasil+diperbarui");
  } catch (err) {
    console.log(err);
  }
};
