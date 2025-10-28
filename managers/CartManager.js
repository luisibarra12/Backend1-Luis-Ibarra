const fs = require('fs');
const path = require('path');
const cartsFilePath = path.join(__dirname, '../data/carts.json');

class CartManager {
  static getAllCarts() {
    const cartsData = fs.readFileSync(cartsFilePath, 'utf-8');
    return JSON.parse(cartsData);
  }

  static getCartById(id) {
    const carts = this.getAllCarts();
    return carts.find(cart => cart.id === id);
  }

  static addCart() {
    const carts = this.getAllCarts();
    const newCart = { id: this.generateId(carts), products: [] };
    carts.push(newCart);
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
    return newCart;
  }

  static addProductToCart(cartId, productId, quantity = 1) {
    const carts = this.getAllCarts();
    const cart = this.getCartById(cartId);
    if (!cart) return null;

    const productIndex = cart.products.findIndex(p => p.product === productId);
    if (productIndex === -1) {
      cart.products.push({ product: productId, quantity });
    } else {
      cart.products[productIndex].quantity += quantity;
    }
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
    return cart;
  }

  static generateId(carts) {
    return carts.length > 0 ? Math.max(...carts.map(c => c.id)) + 1 : 1;
  }
}

module.exports = CartManager;