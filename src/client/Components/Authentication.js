import Socket from "./Socket";
import axios from "axios";

class AuthenticationManager {
  static timeOut = 3000;

  isAuthenticated = false;

  checkAuthStatus = new Promise((resolve, reject) => {
    const timeOut = setTimeout(() => {
      resolve();
    }, AuthenticationManager.timeOut);

    axios
      .get(Socket.endpoint, { withCredentials: true })
      .then(function(response) {
        reject(response);
      })
      .catch((error) => {
        clearTimeout(timeOut);
        if (!error.response) reject(error);
        const resStatus = error.response.status;
        if (resStatus == 404) {
          this.isAuthenticated = true;
          resolve();
        } else if (resStatus == 401) {
          this.isAuthenticated = false;
          resolve();
        } else reject(error);
      });
  });

  authenticate = (cb) => {
    this.checkAuthStatus.then(() => {
      // console.log("Authenticated? ", this.isAuthenticated);
      cb();
    });
  };

  signout = (cb) => {
    this.isAuthenticated = false;
    cb();
  };
}

export default AuthenticationManager;
