import io from "socket.io-client";
class Socket {
  static endpoint = "localhost:5000";
  constructor(reconnect) {
    this.running = false;
    this.socket = null;
    this.initializeConnection(reconnect);
  }

  initializeConnection(reconnect) {
    console.log("initializeConnection");
    this.socket = io(
      Socket.endpoint,
      {
        reconnection: reconnect,
        reconnectionDelayMax: 30000,
        reconnectionAttempts: 5
      },
      function() {
        console.log("Callback pls..");
      }
    );
  }
}

export default Socket;
