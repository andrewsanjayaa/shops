const db = require("../db"); // pastikan ini adalah instance dari Pool

exports.getAbout = async (req, res) => {
  try {
    const sql = "SELECT * FROM about LIMIT 1";
    const result = await db.query(sql);

    if (!result.rows || result.rows.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PostgreSQL error:", err);
    res.status(500).json({ error: "Database error" });
  }
};

exports.updateAbout = async (req, res) => {
  const { description } = req.body;
  try {
    const sql = "UPDATE about SET description = $1";
    const values = [description];
    await db.query(sql, values);
    res.redirect("/admin.html?msg=About berhasil diperbarui");
  } catch (err) {
    console.error("PostgreSQL error:", err);
    res.status(500).json({ error: "Database error" });
  }
};
