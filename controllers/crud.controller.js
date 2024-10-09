const users = require("../models/users.model");
const classes = require("../models/class.model");
const standard = require("../models/standard.model");
const section = require("../models/section.model");

const getUsers = async (req, res) => {
  try {
    console.log("get req data", req.body);

    const users = await User.find();

    console.log("List of users", users);

    if (users.length === 0) {
        return res.status(204).send(); 
      }
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users", error); 
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found" }); 
      }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user", error); 
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
    const exist = await User.findOne({ first_name, last_name, father_name, mother_name });

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

const createStandard = async (req, res) => {
    try {
      // Validate form data
      const { standard } = req.body;
      if (!standard) {
        return res.status(400).json({ message: "Standard is required" });
      }
  
      //testing for duplicate
      const exist = await User.findOne({ standard : standard});

      console.log(exist, "exist");
      if (exist) {
        return res.status(400).json({ message: "This standard already exists." });
      }
  
      const newStandard = new Standard({standard});
  
      await newStandard.save();
  
      console.log(resp," --------------------====================== resp ======================-------------------- ");
  
      res.status(201).json(newStandard);
    } catch (error) {
      console.error("Error creating standard:", error);
      res.status(500).json({ message: error.message });
    }
  };

  const createSection = async (req, res) => {
    try {
      // Validate form data
      const { section } = req.body;
      if (!section) {
        return res.status(400).json({ message: "details are required" });
      }
  
      //testing for duplicate
      const exist = await Product.findOne({ section:section});
      console.log(exist, "exist");
      if (exist) {
        return res.status(400).json({ message: "An account already exist with this name." });
      }
  
      //const resp = await uploadBook({ filePath, bookName, authorName });
  
      // Create and save the product in MongoDB
      const newSection = new User({section });
  
      await newSection.save();
  
      console.log(
        resp,
        " --------------------====================== resp ======================-------------------- "
      );
  
      res.status(201).json(newSection);
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
  createStandard,
  createSection,
  updateUser,
  deleteUser,
};
