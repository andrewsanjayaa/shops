const express = require("express");
const router = express.Router();
const upload = require("../public/upload");
const { testimoni } = require("../controllers/testiController");

router.get("/", testimoni);

module.exports = router;