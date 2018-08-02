import io from "socket.io-client";
class Socket {
  static endpoint = "http://localhost:5000";
  static reconnectionDelayMax = 30000;
  static reconnectionAttempts = 10;
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
    this.socket.on("Authentication_Successful", () =>
      console.log("Socket connection established!")
    );
  }

  getSocket() {
    return this.socket;
  }
}

export default Socket;
