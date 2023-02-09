const socket = io();
// const container = document.getElementById("realTimeProductsContainer");
const inputMessage = document.getElementById("inputMessage");
const log = document.getElementById("log");

// socket.on("products", (data) => {
//   let html = "";

//   data.forEach((product) => {
//     html += `
//     <div style="width: 30%;">
//       <div >
//         <img
//           src="https://coca-colafemsa.com/wp-content/uploads/2019/11/2.png"
//           alt="${product.title}"
//           style="aspect-ratio: 1; width: 200px; object-fit: cover;"
//         />
//     </div>
//     <h2>${product.title}</h2>
//     <h2>${product.price}</h2>
//     <p>${product.description}</p>
//   </div>`;
//     container.innerHTML = html;
//   });

// });

Swal.fire({
  title: "Identify yourself",
  input: "email",
  text: "Enter your e-mail",
  inputValidator: (value) => {
    return !value && "You need an email";
  },
  allowOutsideClick: false,
  allowEscapeKey: false,
}).then((result) => {
  user = result.value;
  socket.emit("userAuth");
});

socket.on('newUserConnected', data => {
  if(!user) return;
  Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      title: `${data} se ha unido al chat`,
      icon: "success",
  })
})

inputMessage.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && inputMessage.value.trim().length > 0) {
    socket.emit("message", {user, message: inputMessage.value});
    inputMessage.value = "";
  }
});
socket.on('messageLogs', data => {
  if (!user) return;

  let log = document.getElementById('messageLogs');
  let messages = "";
  data.forEach(message => {
      messages = messages + `${message.user} dice: ${message.message} </br>`
      
  })

  log.innerHTML = messages
})

socket.on("log", (data) => {
  let logs = "";
  data.logs.forEach((log) => {
    logs += `<div class="messageContainer"><span class="message">${log.user}: ${
      log.message
    }</span><span class="time">${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}:</span></div>`;
  });
  log.innerHTML = logs;
});