const productsContainer = document.querySelector(".productsContainer");

async function addToCart(id) {
  const options = {
    method: "POST",
    body: "",
    headers: {
      "Content-Type": "application/json",
    },
  };
  await fetch(
    `http://localhost:8080/api/carts/63e44c28458a17955a4de8bf/products/${id}`,
    options
  );
  Swal.fire({
    toast: true,
    icon: "success",
    position: "top-right",
    html: "Product added to cart",
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
}