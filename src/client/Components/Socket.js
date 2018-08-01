import io from "socket.io-client";
class Socket {
  static endpoint = "localhost:5000";
  static reconnectionDelayMax = 30000;
  static reconnectionAttempts = 5;
  constructor(reconnect) {
    this.socket = null;
    this.initializeConnection(reconnect);
  }

  initializeConnection(reconnect) {
    this.socket = io(Socket.endpoint, {
      reconnection: reconnect,
      reconnectionDelayMax: Socket.reconnectionDelayMax,
      reconnectionAttempts: Socket.reconnectionAttempts
    });
    console.log("Socket Connection created!");
  }

  getSocket() {
    return this.socket;
  }
}

export default Socket;
