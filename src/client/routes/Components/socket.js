import io from "socket.io-client";
class Socket {
  static endpoint = "localhost:3000/api";
  constructor() {
    this.running = false;
    this.socket = null;
    this.initializeConnection();
  }

  initializeConnection() {
    this.socket = io.connect(Socket.endpoint);

    this.running = socket.on();
  }

  isRunning = () => {
    return this.running;
  };
}

export default Socket;
