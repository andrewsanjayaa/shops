const express = require("express");
const router = express.Router();
const upload = require("../public/upload");
const { testimoni, createTestimoni, updateTestimoni, deleteTestimoni } = require("../controllers/testiController");

router.get("/", testimoni);
router.post("/create", upload.single("testiimage"), createTestimoni);
router.post("/update", upload.single("imagetesti"), updateTestimoni);
router.delete("/delete/:id", deleteTestimoni);

module.exports = router;