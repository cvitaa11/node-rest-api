const express = require("express");
const router = express.Router();

//GET products
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "GET requests for products"
  });
});

//POST products
router.post("/", (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  };
  res.status(201).json({
    message: "POST requests for products",
    createdProduct: product
  });
});

//GET product by id
router.get("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "GET requests for products/id",
    productId: req.params.productId
  });
});

//PATCH product
router.patch("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "PATCH requests for products/id",
    productId: req.params.productId
  });
});

//DELETE product
router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "DELETE requests for products/id",
    productId: req.params.productId
  });
});

module.exports = router;
