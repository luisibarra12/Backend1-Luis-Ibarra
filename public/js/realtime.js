const socket = io();

// Actualizar la lista cuando el servidor manda cambios
socket.on("updateProducts", (products) => {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach((p) => {
    const item = document.createElement("li");
    item.innerHTML = `${p.title} - $${p.price} (ID: ${p.id})`;
    list.appendChild(item);
  });
});

// Form para agregar producto
document.getElementById("addForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const price = Number(document.getElementById("price").value);

  socket.emit("addProduct", { title, price });

  e.target.reset();
});

// Form para eliminar producto
document.getElementById("deleteForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const id = document.getElementById("deleteId").value;

  socket.emit("deleteProduct", id);

  e.target.reset();
});
