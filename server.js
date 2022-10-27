const http = require("http");
const io = require("socket.io");

const apiServer = require("./api");
const sockets = require("./sockets");

const PORT = 3000;

const httpServer = http.createServer(apiServer);
const socketsServer = io(httpServer);

httpServer.listen(PORT);
console.log(`Listening to port ${PORT}`);

sockets.listen(socketsServer);
