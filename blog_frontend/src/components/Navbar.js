import React from "react";
import "../index.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "../Home";
import Article from "./Articles";
import Login from "./Login";
import Logout from "./Logout";
import BlogApp from './../BlogApp';
const Navbar = () => {
  return (
    <Router>
      <div className="nav_container shadow">
        <div className="nav_div1">
          <h2>MiniBLog</h2>
        </div>

        <div className="nav_div2"></div>
        <div className="nav_div3">
          <ul>
            {/* <li>
              <NavLink exact to="/">
                Home
              </NavLink>
            </li> */}

            <li>
              <NavLink exact to="/Articles">
                BlogApp
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/logout">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <Switch>
        <Route path="/Articles">
          <BlogApp />
        </Route>

        <Route path="/home">
          <Home />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/logout">
          <Logout />
        </Route>
      </Switch>
    </Router>
  );
};

export default Navbar;
