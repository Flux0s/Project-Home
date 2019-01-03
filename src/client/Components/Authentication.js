import Socket from "./Socket";
import axios from "axios";
import CookieStore from "universal-cookie";

class AuthenticationManager {
  static timeOut = 3 * 1000;

  isAuthenticated = false;

  checkAuthStatus = new Promise((resolve, reject) => {
    const timeOut = setTimeout(() => {
      console.log("Error contacting server for auth check...");
      resolve();
    }, AuthenticationManager.timeOut);
    // console.log("Checking auth status...");
    axios
      .get(Socket.endpoint, { withCredentials: true })
      .then((response) => {
        clearTimeout(timeOut);
        // console.log("Auth status: ", response.statusText);
        this.isAuthenticated = true;
        resolve();
      })
      .catch((error) => {
        clearTimeout(timeOut);
        if (!error.response || !error.response.status) {
          reject(error);
          return;
        }
        if (error.response.status == 401) {
          // console.log("Auth status: ", response.statusText);
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
