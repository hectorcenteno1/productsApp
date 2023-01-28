const socket = io();
const container = document.getElementById("realTimeProductsContainer");


socket.on("products", (data) => {
  let html = "";

  data.forEach((product) => {
    html += `
    <div style="width: 30%;">
      <div >
        <img
          src="https://coca-colafemsa.com/wp-content/uploads/2019/11/2.png"
          alt="${product.title}"
          style="aspect-ratio: 1; width: 200px; object-fit: cover;"
        />
    </div>
    <h2>${product.title}</h2>
    <h2>${product.price}</h2>
    <p>${product.description}</p>
  </div>`;
    container.innerHTML = html;
  });

});