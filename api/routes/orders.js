const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const Order = require("../models/order");
const Product = require("../models/product");

//GET orders
router.get("/", checkAuth, (req, res, next) => {
  Order.find()
    .select("_id product quantity")
    .populate("product", "name")
    .exec()
    .then(docs =>
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: `http://localhost:4000/orders/${doc._id}`
            }
          };
        })
      })
    )
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//POST orders
router.post("/", checkAuth, (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      if (!product) {
        res.status(404).json({ message: "Product does not exist!" });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return order.save();
    })
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//GET order by id
router.get("/:orderId", checkAuth, (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate("product", "name price")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "No data found!"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//DELETE order
router.delete("/:orderId", checkAuth, (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: `Order ${req.params.orderId} successfully removed!`
      });
    })
    .catch(err => {
      res.status(500).json({
        error: {
          error: err
        }
      });
    });
});

module.exports = router;
