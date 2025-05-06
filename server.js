const express = require("express");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/aset", express.static(path.join(__dirname, "aset")));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shop_expo",
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/api/products", (req, res) => {
  const sql = "SELECT * FROM product";
  db.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, data: results });
  });
});

