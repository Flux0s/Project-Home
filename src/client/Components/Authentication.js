import Socket from "./Socket";
import axios from "axios";
import CookieStore from "universal-cookie";

class AuthenticationManager {
  static timeOut = 3000;

  isAuthenticated = false;

  checkAuthStatus = new Promise((resolve, reject) => {
    const timeOut = setTimeout(() => {
      console.log("Error contacting server for auth check...");
      resolve();
    }, AuthenticationManager.timeOut);

    axios
      .get(Socket.endpoint, { withCredentials: true })
      .then(function(response) {
        clearTimeout(timeOut);
        reject(response);
      })
      .catch((error) => {
        clearTimeout(timeOut);
        if (!error.response || !error.response.status) {
          reject(error);
          return;
        }
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
    const cookies = new CookieStore();
    cookies.remove("sid");
    this.isAuthenticated = false;
    cb();
  };
}

export default AuthenticationManager;
