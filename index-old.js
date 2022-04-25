const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socketServer) => {
	console.log("a user connected", socketServer.id);

	socketServer.on("chat message", (msg) => {
		console.log("msg--->: ", msg);
		io.emit("chat message", {
			// <------- IMPORTANT: io manda a todas las personas conectadas al socket
			msg: msg.msg,
			date: new Date()
		});
	});

	socketServer.on("disconnect", () => {
		console.log("user disconnected", socketServer.id);
	});
});

server.listen(3000, () => {
	console.log("listening on *:3000");
});
