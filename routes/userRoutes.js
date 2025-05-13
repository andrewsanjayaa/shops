const express = require("express");
const router = express.Router();
const { createUser, getUsers } = require("../controllers/userController");

router.post("/create", createUser);
router.get("/admin", getUsers);

module.exports = router;
