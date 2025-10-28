const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');

class ProductManager {
  static getAllProducts() {
    let productsData = [];

    try {
      // Leer el archivo y parsearlo
      const data = fs.readFileSync(productsFilePath, 'utf-8');
      if (data) {
        productsData = JSON.parse(data); // Si no está vacío, parseamos los datos
      }
    } catch (error) {
      console.error("Error al leer o parsear el archivo products.json:", error);
      // Si hay un error, devolvemos un arreglo vacío
    }

    return productsData; // Siempre devolvemos un arreglo (vacío o con datos)
  }

  static getProductById(id) {
    const products = this.getAllProducts();
    return products.find(product => product.id === id);
  }

  static addProduct(product) {
    const products = this.getAllProducts();
    product.id = this.generateId(products);
    products.push(product);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    return product;
  }

  static updateProduct(id, updatedFields) {
    const products = this.getAllProducts();
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex === -1) return null;
    const updatedProduct = { ...products[productIndex], ...updatedFields };
    products[productIndex] = updatedProduct;
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    return updatedProduct;
  }

  static deleteProduct(id) {
    let products = this.getAllProducts();
    products = products.filter(product => product.id !== id);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    return true;
  }

  static generateId(products) {
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  }
}

module.exports = ProductManager;