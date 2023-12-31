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

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("emituserdata", (dataFromClient) => {
    // brodcast will send the data to other clients without
    // the cliend that sending the data
    socket.broadcast.emit("sendDatatoClient", dataFromClient);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});
server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
