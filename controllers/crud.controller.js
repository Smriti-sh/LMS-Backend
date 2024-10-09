const users = require("../models/users.model");
const classes = require("../models/class.model");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const getUsers = async (req, res) => {
  try {
    console.log("get req data", req);

    console.log("List of users", users);

    // res.status(200).json(products);
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    // Validate form data
    const { first_name,last_name, address,contact_no,father_name,mother_name,roles,school,classroom,dob } = req.body;
    if (!first_name || !last_name || !address || !contact_no || !father_name || !mother_name || !roles || !school || !classroom || !dob) {
      return res
        .status(400)
        .json({ message: "details are required" });
    }

    //testing for duplicate
    const exist = await Product.findOne(
      { first_name: first_name },
      { father_name: father_name },
      { id: 1, bookName: 1 }
    );
    console.log(exist, "exist");
    if (exist) {
      return res.status(400).json({ message: "An account already exist with this name." });
    }

    //const resp = await uploadBook({ filePath, bookName, authorName });

    // Create and save the product in MongoDB
    const newUser = new User({
      first_name,
      middle_name,
      last_name,
      address,
      contact_no,
      father_name,
      mother_name,
      roles,
      school,
      classroom,
      dob
    });

    await newUser.save();

    console.log(
      resp,
      " --------------------====================== resp ======================-------------------- "
    );

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, req.body);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
