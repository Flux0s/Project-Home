import Socket from "./Socket";

class AuthenticationManager {
  isAuthenticated;
  socket;
  constructor() {
    this.socket = new Socket(false).getSocket();
    this.isAuthenticated = this.socket.connected;
    this.socket.disconnect();
    this.socket = null;
  }
  getSocket = () => {
    if (this.socket) return this.socket;
    else this.socket = new Socket(true);
    return this.socket;
  };
  authenticate = (cb) => {
    this.socket = new Socket(true).getSocket();
    this.socket.on("Authentication_Successful", cb, () => {
      this.isAuthenticated = true;
    });
  };
  signout = (cb) => {
    this.isAuthenticated = false;
    this.socket.disconnect();
    cb();
  };
}

export default AuthenticationManager;
