const ProductManager = require('../managers/ProductManager');

class ProductController {

  static async getAllProducts(req, res) {
    try {
      const products = ProductManager.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  }


  static async getProductById(req, res) {
    try {
      const product = ProductManager.getProductById(parseInt(req.params.pid));
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  }


  static async createProduct(req, res) {
    try {
      const newProduct = req.body;
      if (!newProduct.title || !newProduct.price) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }
      const createdProduct = ProductManager.addProduct(newProduct);
      res.status(201).json(createdProduct);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el producto' });
    }
  }

 
  static async updateProduct(req, res) {
    try {
      const updatedProduct = req.body;
      const product = ProductManager.updateProduct(parseInt(req.params.pid), updatedProduct);
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  }

 
  static async deleteProduct(req, res) {
    try {
      const success = ProductManager.deleteProduct(parseInt(req.params.pid));
      if (!success) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  }
}

module.exports = ProductController;