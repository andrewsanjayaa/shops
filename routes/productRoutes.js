const express = require("express");
const router = express.Router();
const upload = require("../public/upload");
const { product, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");

router.get("/", product);
router.post("/addproduct", upload.single("productimage"), createProduct);
router.post("/update", upload.single("productimage"), updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
