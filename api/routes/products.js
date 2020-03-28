const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = require("../models/product");

//GET products
router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//POST products
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  product
    .save()
    .then(result => {
      res.status(201).json({
        message: "Product successfully created!",
        createdProduct: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//GET product by id
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "No data found!" });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//PATCH product
router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//DELETE product
router.delete("/:productId", (req, res, next) => {
  Product.remove({ _id: req.params.productId })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
