const cors = require("cors");
const app =
  require("express")(); /* this will import and invoke the function at the same time */
app.use(cors());
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const port = process.env.PORT || 8080;

var listOfUsers = [];

io.on("connection", (socket) => {
  console.log("user connected");
  listOfUsers.push(socket.id);
  socket.on("emituserdata", (dataFromClient) => {
    listOfUsers.forEach((userId) => {
      if (userId != socket.id) {
        socket.emit("sendDatatoClient", dataFromClient);
      }
    });
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});
server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
