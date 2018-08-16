import React, { Component } from "react";
import LoginPage from "./routes/LoginPage";
import HomePage from "./routes/HomePage";
import AuthenticationManager from "./Components/Authentication";
import LinearProgressBar from "./Components/LinearProgressBar";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./app.scss";

const Auth = new AuthenticationManager();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingProgess: 0,
      progressBar: React.createRef(),
      loadingInterval: setInterval(() => {
        this.setState({
          loadingProgess:
            this.state.loadingProgess + LinearProgressBar.updateInterval
        });
        this.state.progressBar.current.setProgress(
          this.state.loadingProgess / 100
        );
      }, (AuthenticationManager.timeOut / 100) * LinearProgressBar.updateInterval),
      pageDisplay: this.LoadingPage
    };
  }

  componentWillMount() {
    Auth.checkAuthStatus
      .then(() => {
        clearInterval(this.state.loadingInterval);
        console.log("Auth server response resolution!");
        this.setState({
          pageDisplay: this.PageContents,
          loadingProgess: 100
        });
        this.state.progressBar.current.setProgress(1);
        this.state.progressBar.current.close();
      })
      .catch((error) => {
        console.log("Recieved error from Auth check", error);
        clearInterval(this.state.loadingInterval);
        this.setState({
          pageDisplay: this.PageContents,
          loadingProgess: 100
        });
        this.state.progressBar.current.setProgress(1);
        this.state.progressBar.current.close();
      });
  }

  render() {
    return (
      <div>
        {/* <LinearProgressBar ref={this.state.progressBar} /> */}
        <this.state.pageDisplay />
      </div>
    );
  }

  logout = (cb) => {
    console.log("Logging out...");
    Auth.signout(cb);
  };

  LoadingPage = () => <div> </div>;

  PageContents = () => (
    <BrowserRouter>
      <Switch>
        <Route
          path="/login"
          render={(props) => {
            return (
              <LoginPage
                {...props}
                loggedIn={Auth.isAuthenticated}
                authenticate={Auth.authenticate}
              />
            );
          }}
        />
        <PrivateRoute path="/home" component={HomePage} logout={this.logout} />
        <Redirect to="/home" />
        {/* <Redirect to="/login" /> */}
      </Switch>
    </BrowserRouter>
  );
}

const PrivateRoute = ({
  component: Component,
  path: Path,
  logout: Logout,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (Auth.isAuthenticated) {
        // window.console.log("Authenticated! displaying requested private component...");
        return <Component {...props} logout={Logout} />;
      } else {
        // window.console.log("Unauthenticated! redirecting to: /login...");
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }
    }}
  />
);

// const AuthButton = withRouter(
//   ({ history }) =>
//     Auth.isAuthenticated ? (
//       <p>
//         Welcome!{" "}
//         <button
//           onClick={() => {
//             Auth.signout(() => history.push("/"));
//           }}
//         >
//           Sign out
//         </button>
//       </p>
//     ) : (
//       <p>You are not logged in.</p>
//     )
// );

export default App;
