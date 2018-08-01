import Socket from "./Socket";
import axios from "axios";

class AuthenticationManager {
  static timeOut = 5000;

  isAuthenticated;
  socket;
  constructor() {}

  checkAuthStatus = new Promise((resolve, reject) => {
    // axios
    //   .get(Socket.endpoint)
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
    // console.log("Async load complete!");
    // resolve();
    setTimeout(() => {
      console.log("Async load complete!");
      resolve();
    }, AuthenticationManager.timeOut);
  });

  getSocket = () => {
    if (this.socket) return this.socket;
    else this.socket = new Socket(true);
    return this.socket;
  };

  authenticate = (cb) => {
    this.socket = new Socket(false).getSocket();
    this.socket.on("Authentication_Successful", cb, () => {
      this.socket = new Socket(true).getSocket();
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
