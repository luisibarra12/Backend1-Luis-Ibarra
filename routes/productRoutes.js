const express = require("express");
const router = express.Router();
const path = require("path");

const ProductManager = require("../managers/ProductManager");
const productManager = new ProductManager(
  path.join(__dirname, "..", "data", "products.json")
);

// Obtener todos los productos
router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

// Obtener producto por ID
router.get("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const product = await productManager.getProductById(id);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(product);
});

// Crear producto
router.post("/", async (req, res) => {
  const newProduct = await productManager.addProduct(req.body);
  res.status(201).json(newProduct);
});

// Actualizar producto
router.put("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);

  const updated = await productManager.updateProduct(id, req.body);
  if (!updated) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(updated);
});

// Eliminar producto
router.delete("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);

  await productManager.deleteProduct(id);
  res.status(204).send();
});

module.exports = router;