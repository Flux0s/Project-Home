import io from "socket.io-client";
class Socket {
  static endpoint =
    process.env.DOMAIN + ":" + process.env.SERVER_PORT + "/auth";
  static reconnectionDelayMax = process.env.SOCKET_RECONNECT_DELAY_MAX;
  static reconnectionAttempts = process.env.SOCKET_RECONNECT_ATTEMPTS;
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
    this.socket.on("disconnected", () =>
      console.log("Socket disconnected by server!")
    );
  }

  getSocket() {
    return this.socket;
  }
}

export default Socket;
