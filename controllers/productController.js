const db = require("../db");


exports.product = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM product");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

exports.createProduct = async (req, res) => {
  const { productname, productprice, productimage, productdetail } = req.body;
  const image = req.file ? req.file.filename : null; // hanya simpan nama file

  try {
    const date_created = new Date();
    const user_updated = 'admin';
    const result = await db.query(
      "INSERT INTO product (name, description, stock, image, date_created, user_updated) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [productname, productdetail, productprice, image, date_created, user_updated]
    );
    res.redirect("/admin.html?msg=Product+berhasil+diperbarui");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan saat menyimpan produk" });
  }
};

exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { productname, productprice, productimage, productdetail } = req.body;
  const image = req.file ? req.file.filename : null; // hanya simpan nama file

  try {
    const date_updated = new Date();
    const user_updated = 'admin';
    const result = await db.query(
      "UPDATE product SET name = $1, description = $2, stock = $3, image = $4, date_updated = $5, user_updated = $6 WHERE id = $7 RETURNING *",
      [productname, productdetail, productprice, image, date_updated, user_updated, productId]
    );
    res.redirect("/admin.html?msg=Product+berhasil+diperbarui");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan saat memperbarui produk" });
  }
};