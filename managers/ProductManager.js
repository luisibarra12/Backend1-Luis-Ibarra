const fs = require("fs");
const path = require("path");

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  // Obtener todo
  async getProducts() {
    try {
      if (!fs.existsSync(this.filePath)) {
        return [];
      }

      const data = await fs.promises.readFile(this.filePath, "utf-8");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error al leer products.json:", error);
      return [];
    }
  }

  // Obtener por ID
  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((p) => p.id === id);
  }

  // Agregar
  async addProduct(product) {
    const products = await this.getProducts();

    const newProduct = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      ...product,
    };

    products.push(newProduct);

    await fs.promises.writeFile(
      this.filePath,
      JSON.stringify(products, null, 2)
    );

    return newProduct;
  }

  // Actualizar
  async updateProduct(id, updatedFields) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) return null;

    products[index] = { ...products[index], ...updatedFields };

    await fs.promises.writeFile(
      this.filePath,
      JSON.stringify(products, null, 2)
    );

    return products[index];
  }

  // Eliminar
  async deleteProduct(id) {
    let products = await this.getProducts();

    products = products.filter((p) => p.id !== id);

    await fs.promises.writeFile(
      this.filePath,
      JSON.stringify(products, null, 2)
    );

    return true;
  }
}

module.exports = ProductManager;