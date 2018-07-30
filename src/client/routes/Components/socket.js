import io from "socket.io-client";
class Socket {
  static endpoint = "localhost:5000";
  constructor(reconnect) {
    this.socket = null;
    this.initializeConnection(reconnect);
  }

  initializeConnection(reconnect) {
    console.log("Initializing new socket Connection...");
    this.socket = io(Socket.endpoint, {
      reconnection: reconnect,
      reconnectionDelayMax: 30000,
      reconnectionAttempts: 5
    });
    console.log("Socket Connection created!");
  }

  getSocket() {
    return this.socket;
  }
}

export default Socket;
