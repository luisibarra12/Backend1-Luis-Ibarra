const CartManager = require('../managers/CartManager');
const ProductManager = require('../managers/ProductManager');

class CartController {

  static async createCart(req, res) {
    try {
      const newCart = CartManager.addCart();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ error: 'No se pudo crear el carrito' });
    }
  }


  static async getCartById(req, res) {
    try {
      const cart = CartManager.getCartById(parseInt(req.params.cid));
      if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }
      res.json(cart.products);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el carrito' });
    }
  }


  static async addProductToCart(req, res) {
    try {
      const product = ProductManager.getProductById(parseInt(req.params.pid));
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      const cart = CartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid));
      if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
  }
}

module.exports = CartController;