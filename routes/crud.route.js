const express = require("express");
const User = require("../models/users.model.js");
const router = express.Router();
const {getUsers, getUser, createUser, updateUser, deleteUser, createStandard,createSection} = require('../controllers/crud.controller.js');


router.get('/list', getUsers);
router.get("/:id", getUser);

router.post("/upload", createUser);
router.post("/standard", createStandard);
router.post("/section", createSection);

// update a product
router.put("/:id", updateUser);

// delete a product
router.delete("/:id", deleteUser);

module.exports = router;