import io from "socket.io-client";
class Socket {
  static endpoint = "localhost:5000";
  constructor(reconnect) {
    this.running = false;
    this.socket = null;
    this.initializeConnection(reconnect);
  }

  initializeConnection(reconnect) {
    this.socket = io.connect(
      Socket.endpoint,
      {
        reconnection: reconnect,
        reconnectionDelayMax: 30000,
        reconnectionAttempts: 5
      }
    );
  }
}

export default Socket;
