const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');

// Crear un carrito
router.post('/', (req, res) => {
  const newCart = CartManager.addCart();
  res.status(201).json(newCart);
});

// Obtener productos de un carrito
router.get('/:cid', (req, res) => {
  const cart = CartManager.getCartById(parseInt(req.params.cid));
  if (!cart) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }
  res.json(cart.products);
});

// Agregar un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
  const cart = CartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
  if (!cart) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }
  res.json(cart);
});

module.exports = router;