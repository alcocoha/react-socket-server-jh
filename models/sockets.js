class Sockets {
	constructor(io) {
		this.io = io;
		this.socketEvents();
	}

	socketEvents() {
		// En conexion
		this.io.on("connection", (socketServer) => {
			console.log("a user connected", socketServer.id);

			// Escuchar evento
			socketServer.on("chat message", (msg) => {
				console.log("msg--->: ", msg);
				this.io.emit("chat message", {
					// <------- IMPORTANT: io manda a todas las personas conectadas al socket
					msg: msg.msg,
					date: new Date()
				});
			});

			socketServer.on("disconnect", () => {
				console.log("user disconnected", socketServer.id);
			});
		});
	}
}

module.exports = Sockets;
