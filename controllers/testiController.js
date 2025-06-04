const db = require("../db");
const fs = require("fs");
const path = require("path");

exports.testimoni = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT testimoni.detail as detail, testimoni.name as name, testimoni.image as image, product.name as product, testimoni.id as id FROM testimoni join product on testimoni.id_product = product.id"
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

exports.getTestimoni = async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await db.query(
      "SELECT testimoni.detail as detail, testimoni.name as name, testimoni.image as image, product.name as product, testimoni.id as id FROM testimoni WHERE id = $1 join product on testimoni.id_product = product.id",
      [productId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
  }
};

exports.createTestimoni = async (req, res) => {
  const { testiimage, testiuser, testiproduct, testidetail } = req.body;
  const image = req.file ? req.file.filename : null; // hanya simpan nama file

  try {
    const result = await db.query(
      "INSERT INTO testimoni (detail, id_product, name, image) VALUES ($1, $2, $3, $4) RETURNING *",
      [testidetail, testiproduct, testiuser, image]
    );
    res.redirect("/admin.html?msg=Testimoni+berhasil+ditambah");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan saat menyimpan testi" });
  }
};

exports.updateTestimoni = async (req, res) => {
  const testimoniId = req.body.id;
  const { imagetesti, detailtesti } = req.body;
  const newImage = req.file ? req.file.filename : null; // hanya simpan nama file

  try {
    const existing = await db.query(
      "SELECT image FROM testimoni WHERE id = $1",
      [testimoniId]
    );
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Testi tidak ditemukan" });
    }

    const oldImage = existing.rows[0].image;

    // Hapus image ke yang baru
    if (newImage && oldImage) {
      const oldImagePath = path.join(
        __dirname,
        "..",
        "public",
        "aset",
        oldImage
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const result = await db.query(
      "UPDATE testimoni SET detail = $1, image = $2 WHERE id = $3 RETURNING *",
      [detailtesti, newImage, testimoniId]
    );
    res.redirect("/admin.html?msg=Testimoni+berhasil+diperbarui");
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat memperbarui testimoni" });
  }
};

exports.deleteTestimoni = async (req, res) => {
  const testimoniId = req.params.id;
  try {
    const existing = await db.query("SELECT image FROM testimoni WHERE id = $1", [
      testimoniId,
    ]);
    const oldImage = existing.rows[0].image;
    const oldImagePath = path.join(__dirname, "..", "public", "aset", oldImage);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }

    const result = await db.query("DELETE FROM testimoni WHERE id = $1", [
      testimoniId,
    ]);
    res.status(200).json({ message: "Testimoni berhasil dihapus" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Gagal menghapus testimoni" });
  }
};
