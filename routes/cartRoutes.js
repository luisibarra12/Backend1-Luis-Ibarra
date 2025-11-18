const express = require("express");
const router = express.Router();
const path = require("path");

const CartManager = require("../managers/CartManager");
const cartManager = new CartManager(
  path.join(__dirname, "..", "data", "carts.json")
);

// Crear un carrito
router.post("/", async (req, res) => {
  const newCart = await cartManager.addCart();
  res.status(201).json(newCart);
});

// Obtener productos de un carrito
router.get("/:cid", async (req, res) => {
  const id = parseInt(req.params.cid);

  const cart = await cartManager.getCartById(id);
  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }

  res.json(cart.products);
});

// Agregar producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);

  const cart = await cartManager.addProductToCart(cid, pid);

  if (!cart) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }

  res.json(cart);
});

module.exports = router;