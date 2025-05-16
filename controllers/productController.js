const db = require("../db");
const fs = require("fs");
const path = require("path");

exports.product = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM product");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

exports.getProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await db.query("SELECT * FROM product WHERE id = $1", [
      productId,
    ]);
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
  }
};

exports.createProduct = async (req, res) => {
  const { productname, productprice, productimage, productdetail } = req.body;
  const image = req.file ? req.file.filename : null; // hanya simpan nama file

  try {
    const date_created = new Date();
    const user_updated = "admin";
    const result = await db.query(
      "INSERT INTO product (name, description, stock, image, date_created, user_updated) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        productname,
        productdetail,
        productprice,
        image,
        date_created,
        user_updated,
      ]
    );
    res.redirect("/admin.html?msg=Product+berhasil+diperbarui");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan saat menyimpan produk" });
  }
};

exports.updateProduct = async (req, res) => {
  const productId = req.body.id;
  const { productname, productprice, productimage, productdetail } = req.body;
  const newImage = req.file ? req.file.filename : null;

  try {
    // Ambil image lama
    const existing = await db.query("SELECT image FROM product WHERE id = $1", [
      productId,
    ]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
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

    const date_updated = new Date();
    const user_updated = "admin";

    const finalImage = newImage ? newImage : oldImage;

    const result = await db.query(
      "UPDATE product SET name = $1, description = $2, stock = $3, image = $4, date_updated = $5, user_updated = $6 WHERE id = $7 RETURNING *",
      [
        productname,
        productdetail,
        productprice,
        finalImage,
        date_updated,
        user_updated,
        productId,
      ]
    );

    res.redirect("/admin.html?msg=Product+berhasil+diperbarui");
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat memperbarui produk" });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const existing = await db.query("SELECT image FROM product WHERE id = $1", [
      productId,
    ]);
    const oldImage = existing.rows[0].image;
    const oldImagePath = path.join(__dirname, "..", "public", "aset", oldImage);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
    const result = await db.query("DELETE FROM product WHERE id = $1", [
      productId,
    ]);
    res.status(200).json({ message: "Product berhasil dihapus" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Gagal menghapus product" });
  }
};
