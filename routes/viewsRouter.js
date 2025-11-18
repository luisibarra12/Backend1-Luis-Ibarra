const express = require("express");
const router = express.Router();
const path = require("path");

const ProductManager = require("../managers/ProductManager");
const productManager = new ProductManager(
  path.join(__dirname, "..", "data", "products.json")
);

// Vista HOME → lista normal
router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products });
});

// Vista realtime → usa websocket
router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

module.exports = router;