const Users = require("../models/users.model");
const Records = require("../models/records.model");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { uploadBook } = require("./llm.controller");

const getProducts = async (req, res) => {
  try {
    console.log("get req data", req);

    let { limit, skip, sort } = req.query;

    limit = Number(limit);
    skip = Number(skip);

    //projection
    const products = await Product.aggregate([
      {
        $project: {
          bookName: 1,
          authorName: 1,
          totalPages: 1,
        },
      },
      {
        $sort: {
          bookName: 1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    const totalCount = await Product.countDocuments();

    console.log("paginated data", products);

    // res.status(200).json(products); //The paginated list of products that was sliced from the array.
    res.json({ totalCount, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "..", "uploads/pdf");

    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir); // Store in 'uploads/pdf' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to only accept PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only PDF files are allowed!"), false); // Reject the file
  }
};

// Initialize multer
const upload = multer({ storage, fileFilter });

const createProduct = async (req, res) => {
  try {
    // Validate form data
    const { bookName, authorName } = req.body;
    if (!bookName || !authorName) {
      return res
        .status(400)
        .json({ message: "Book name and author name are required" });
    }

    //testing for duplicate
    const exist = await Product.findOne(
      { bookName: bookName },
      { id: 1, bookName: 1 }
    );
    console.log(exist, "exist");
    if (exist) {
      return res.status(400).json({ message: "This book already exists." });
    }

    // Handle file upload
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    // Read file contents as binary data (Buffer)
    const filePath = file.path;
    const fileData = fs.readFileSync(filePath); // Read file from local storage

    const resp = await uploadBook({ filePath, bookName, authorName });

    // Create and save the product in MongoDB
    const newProduct = new Product({
      bookName,
      authorName,
      pdfBuffer: fileData, // Save file as binary data (Buffer) in MongoDB
      pdfPath: filePath, // Save the file path where it's stored locally
      totalPages: resp.totalPages,
    });

    await newProduct.save();

    console.log(
      resp,
      " --------------------====================== resp ======================-------------------- "
    );

    // TODO remove pdf from storage

    // Synchronously delete a file
    try {
      fs.unlinkSync(filePath);
      console.log("File deleted!");
    } catch (err) {
      // Handle specific error if any
      console.error(err.message);
    }
    // localStorage.clear(fileData);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct: [upload.single("pdf"), createProduct],
  updateProduct,
  deleteProduct,
};
