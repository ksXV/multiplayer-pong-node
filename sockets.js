let playersReady = 0;
function listen(io) {
  const pongNamespace = io.of("/pong");

  pongNamespace.on("connection", (socket) => {
    console.log("a user connected");
    let room;
    socket.on("ready", () => {
      room = "room" + Math.floor(playersReady / 2);
      socket.join(room);

      console.log("Player ready ", socket.id, room);

      playersReady++;

      if (playersReady % 2 === 0) {
        //broadcast('startgame')
        pongNamespace.in(room).emit("startGame", socket.id);
      }
    });
    socket.on("paddleMove", (paddleData) => {
      socket.to(room).emit("paddleMove", paddleData);
    });
    socket.on("ballMove", (ballData) => {
      socket.to(room).emit("ballMove", ballData);
    });
    socket.on("disconnect", (reason) => {
      console.log(`Client ${socket.id} disconnected because ${reason}`);
      socket.leave(room);
    });
  });
}

module.exports = { listen };
