import React, { useState, useEffect } from "react";
import "./App.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//components

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import GameDetails from "./components/GameDetails";

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verified", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  });

  return (
    <>
      <div className="App">
        <Router>
          <NavBar setAuth={setAuth} isAuthenticated={isAuthenticated} />
          <div className="backgroundOverlay2">
            <div className="container">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route
                  setAuth={setAuth}
                  isAuthenticated={isAuthenticated}
                  exact
                  path="/details/:game_slug"
                >
                  <GameDetails
                    setAuth={setAuth}
                    isAuthenticated={isAuthenticated}
                  />
                </Route>
                <Route
                  exact
                  path="/login"
                  render={(props) =>
                    !isAuthenticated ? (
                      <Login {...props} setAuth={setAuth} />
                    ) : (
                      <Redirect to="/dashboard" />
                    )
                  }
                />
                <Route
                  exact
                  path="/register"
                  render={(props) =>
                    !isAuthenticated ? (
                      <Register {...props} setAuth={setAuth} />
                    ) : (
                      <Redirect to="/login" />
                    )
                  }
                />
                <Route
                  exact
                  path="/dashboard"
                  render={(props) =>
                    isAuthenticated ? (
                      <Dashboard {...props} setAuth={setAuth} />
                    ) : (
                      <Redirect to="/login" />
                    )
                  }
                />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
      <footer className="footer">
        <div className="container">
          <span className="text-muted">
            <a className="apiLink" href="https://otis.codes">
              otis
            </a>{" "}
            |{" "}
            <a className="apiLink" href="https://otis.codes">
              codes
            </a>
            <a href="https://www.linkedin.com/in/otiswilcox/">
              <img
                className="linkedinlogo"
                alt="linkedin logo"
                src="../linkedin-logo.png"
                width="40px"
              ></img>
            </a>{" "}
            |
            <a href="https://github.com/gtfotis">
              <img
                className="githublogo"
                alt="github logo"
                src="../github-logo.png"
                width="40px"
              ></img>
            </a>
            API powered by:{" "}
            <a className="apiLink" href="https://api.rawg.io/docs/">
              RAWG
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}

export default App;
