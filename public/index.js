// connect to the socket.io server
const socket = io("http://localhost:3000");
socket.on("connect", function (socket) {
  console.log("successfully Connected to the server!");
});
socket.on("connect_failed", function () {
  console.log("Sorry, there seems to be an issue with the connection!");
});
socket.on("disconnect", function (socket) {
  console.log("disconnected from the server!");
});
socket.on(
  "send-data-to-frontend",
  ({ arrayOfValidatedObjects: arr, timeOfRecievingData }) => {
    timeOfRecievingData = new Date(timeOfRecievingData).toLocaleString();
    updateTable(arr, timeOfRecievingData);
  }
);

// updates Dom by adding rows to table using data recieved over web sockets
function updateTable(arr, timeOfRecievingData) {
  const tableBody = document.querySelector("tbody");
  let domTableRowString = arr
    .map(({ name, origin, destination }) => {
      return `<tr>
      <td>${name}</td>
      <td>${origin}</td>
      <td>${destination}</td>
      <td>${timeOfRecievingData.toString()}</td>
    </tr>`;
    })
    .join(" ");
  tableBody.innerHTML += domTableRowString;
}
