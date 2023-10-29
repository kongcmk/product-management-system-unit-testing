const Product = require("../models/product");
const Joi = require("joi");

// product validate
const productSchema = Joi.object({
  product_id: Joi.number().positive().required(),
  name: Joi.string().min(8).required(),
  category: Joi.string().required(),
  price: Joi.number().positive().min(0).required(),
  stock: Joi.number().positive().min(0).required(),
});

// All products
exports.getProducts = async (req, res) => {
  try {
    const productsData = await Product.find({});
    res.status(200).json(productsData); // Change status to 200 OK
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Single product with ObjectId --> _id:
exports.getProduct = async (req, res) => {
  const reqId = req.params.id;
  try {
    const productData = await Product.findOne({ product_id: reqId });

    if (!productData) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(productData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add product
exports.addProduct = async (req, res) => {
  const reqData = req.body;

  try {
    if (!reqData) {
      return res.status(400).json({ error: "Product data is missing" });
    }

    const { error, value } = productSchema.validate(reqData);

    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((detail) => detail.message) });
    }

    const existingProduct = await Product.findOne({
      product_id: reqData.product_id,
    });

    if (existingProduct) {
      return res.status(400).json({ error: "Product ID already exists" });
    }

    const newProduct = new Product(reqData);

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct); // Change status to 201 Created
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Edit product
exports.editProduct = async (req, res) => {
  const reqId = req.params.id;
  const updateData = req.body;

  try {
    const { error, value } = productSchema.validate(updateData);

    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((detail) => detail.message) });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { product_id: reqId },
      { $set: updateData, updated_at: Date.now() },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Sever Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  const reqId = req.params.id;
  try {
    const deleteData = await Product.findOneAndDelete({ product_id: reqId });

    if (!deleteData) {
      return res.status(404).json({ Error: "Product not found" });
    }

    res.status(200).json("ID : " + reqId + " is delete successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
