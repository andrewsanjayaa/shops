const express = require("express");
const router = express.Router();
const { createUser, getUsers, deleteUser, updateUser } = require("../controllers/userController");

router.post("/create", createUser);
router.get("/", getUsers);
router.delete("/delete/:id", deleteUser);
router.post("/update", updateUser);

module.exports = router;
