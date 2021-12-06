const socket = io("http://localhost:3000");
socket.on("greetings", (data) => {
  console.log(data, "fdgdfgdg");
});
socket.on("send-data-to-frontend", (data) => {
  console.log("data recieved from server xx ", data);
  updateTable(data);
});

// handles the array
function updateTable(arr) {
  console.log("inside update table");
  const tableBody = document.querySelector("tbody");
  let domTableRowString = arr
    .map(({ name, origin, destination }) => {
      return `<tr>
      <td>${name}</td>
      <td>${origin}</td>
      <td>${destination}</td>
      <td>${name}</td>
    </tr>`;
    })
    .join(" ");
  console.log(domTableRowString);
  tableBody.innerHTML += domTableRowString;
}
