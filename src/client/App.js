import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import HomePage from "./routes/HomePage";
import AuthenticationManager from "./Components/Authentication";
import {
  MDCLinearProgress,
  MDCLinearProgressFoundation
} from "@material/linear-progress";
import "./app.scss";

const Auth = new AuthenticationManager();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingProgess: 0,
      loadingInterval: setInterval(() => {
        this.setState({ loadingProgess: this.state.loadingProgess + 1 });
        this.state.progressBar.setProgress(this.state.loadingProgess / 100);
      }, AuthenticationManager.timeOut / 100),
      pageDisplay: this.LoadingPage,
      progressBar: null
    };
  }

  componentWillMount() {
    Auth.checkAuthStatus.then(() => {
      clearInterval(this.state.loadingInterval);
      this.setState({ PageDisplay: this.LoadedPage, loadingProgess: 100 });
      console.log("Loaded post auth-check content.");
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div role="progressbar" className="mdc-linear-progress progress-bar">
          <div className="mdc-linear-progress__buffering-dots" />
          <div className="mdc-linear-progress__buffer" />
          <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
            <span className="mdc-linear-progress__bar-inner" />
          </div>
          <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
            <span className="mdc-linear-progress__bar-inner" />
          </div>
        </div>
        <this.state.pageDisplay />
      </BrowserRouter>
    );
  }

  componentDidMount() {
    this.setState({
      progressBar: new MDCLinearProgressFoundation(
        document.querySelector(".progress-bar")
      ).setProgress(0.5)
    });
  }

  logout = () => {
    console.log("Logging out...");
    withRouter(({ history }) => Auth.signout(() => history.push("/")));
  };
  LoadingPage = () => <div>Loading {this.state.loadingProgess}%...</div>;
  LoadedPage = () => <div> Loading Complete! </div>;
}

const PageContents = () => (
  <Switch>
    <Route
      path="/login"
      render={(props) => (
        <LoginPage
          {...props}
          loggedIn={Auth.isAuthenticated}
          authenticate={Auth.authenticate}
        />
      )}
    />
    <PrivateRoute path="/home" component={HomePage} logout={this.logout} />
    {/* <Redirect to="/home" /> */}
    {/* <Redirect to="/login" /> */}
  </Switch>
);

const PrivateRoute = ({ component: Component, path: Path, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (false) {
        window.console.log(
          "Authenticated! displaying requested private component..."
        );
        return <Component {...props} socket={Auth.getSocket()} />;
      } else {
        window.console.log("Unauthenticated! redirecting to: /login...");
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
