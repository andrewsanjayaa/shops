const express = require("express");
const router = express.Router();
const upload = require("../public/upload");
const { product, createProduct } = require("../controllers/productController");

router.get("/", product);
router.post("/addproduct", upload.single("productimage"), createProduct);

module.exports = router;
