const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');

// Obtener todos los productos
router.get('/', (req, res) => {
  const products = ProductManager.getAllProducts();
  res.json(products);
});

// Obtener un producto por id
router.get('/:pid', (req, res) => {
  const product = ProductManager.getProductById(parseInt(req.params.pid));
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(product);
});

// Crear un producto
router.post('/', (req, res) => {
  const newProduct = req.body;
  const createdProduct = ProductManager.addProduct(newProduct);
  res.status(201).json(createdProduct);
});

// Actualizar un producto
router.put('/:pid', (req, res) => {
  const updatedProduct = req.body;
  const product = ProductManager.updateProduct(parseInt(req.params.pid), updatedProduct);
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(product);
});

// Eliminar un producto
router.delete('/:pid', (req, res) => {
  const success = ProductManager.deleteProduct(parseInt(req.params.pid));
  if (!success) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.status(204).send();
});

module.exports = router;