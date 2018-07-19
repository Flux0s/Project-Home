class Authorization {
  static SERVER_ENDPOINT = "/api";
  constructor(props) {
    this.state = {
      isAuthenticated: false
    };
  }
  isAuthenticated = () => {
    return this.state.isAuthenticated;
  };
}

export default Authorization;
