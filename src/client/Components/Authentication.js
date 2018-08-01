import Socket from "./Socket";
import axios from "axios";

class AuthenticationManager {
  static timeOut = 5000;

  isAuthenticated = false;
  socket;

  checkAuthStatus = new Promise((resolve, reject) => {
    const timeOut = setTimeout(() => {
      resolve();
    }, AuthenticationManager.timeOut);

    // axios
    //   .get(Socket.endpoint)
    //   .then(function(response) {
    //     reject(response);
    //   })
    //   .catch((error) => {
    //     clearTimeout(timeOut);
    //     const resStatus = error.response.status;
    //     if (resStatus == 404) {
    //       this.isAuthenticated = true;
    //       resolve();
    //     } else if (resStatus == 401) {
    //       this.isAuthenticated = false;
    //       resolve();
    //     } else reject(error);
    //   });
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
