const express = require("express");
const { engine } = require("express-handlebars");
const { Server } = require("socket.io");
const path = require("path");

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const viewsRouter = require("./routes/viewsRouter");

const ProductManager = require("./managers/ProductManager");
const productManager = new ProductManager(path.join(__dirname, "data/products.json"));

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Rutas API
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

// Rutas de vistas
app.use("/", viewsRouter);

// Servidor
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// SOCKET.IO
const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");

  // Enviar productos al conectar
  const products = await productManager.getProducts();
  socket.emit("updateProducts", products);

  // Agregar producto
  socket.on("addProduct", async (productData) => {
    await productManager.addProduct(productData);
    const updated = await productManager.getProducts();
    io.emit("updateProducts", updated);
  });

  // Eliminar producto
  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(id);
    const updated = await productManager.getProducts();
    io.emit("updateProducts", updated);
  });
});
