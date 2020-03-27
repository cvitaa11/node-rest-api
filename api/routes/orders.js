const express = require("express");
const router = express.Router();

//GET orders
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "GET requests for /orders"
  });
});

//POST orders
router.post("/", (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  };
  res.status(201).json({
    message: "POST requests for /orders",
    createdOrder: order
  });
});

//GET order by id
router.get("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "GET requests for /orders/orderId",
    orderId: req.params.orderId
  });
});

//DELETE order
router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "DELETE requests for /orders/orderId",
    orderId: req.params.orderId
  });
});

module.exports = router;
