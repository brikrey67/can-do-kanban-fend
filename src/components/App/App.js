import React, { Component } from "react";
import "./App.css";

import Signup from "../Signup/Signup.js";
import Login from "../Login/Login.js";
import Buckets from "../Buckets/Buckets.js";
import BucketDetail from "../BucketDetail/BucketDetail.js";

import { Route, Link, Switch } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <h1>Can-Do-Kanban</h1>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/buckets">Buckets</Link>
        </nav>
        <main>
          <Switch>
            <Route path="/signup" render={() => <Signup />} />
            <Route path="/login" render={() => <Login />} />
            <Route
              exact
              path="/buckets"
              render={props => <Buckets {...props} />}
            />
            {/* <Route
              path="/buckets/:bucket"
              render={props => <BucketDetail {...props} />}
            /> */}

            <Route path="/buckets/:bTitle" component={BucketDetail} />
            {/* <Route path="/*" render={() => <Redirect to="/buckets" />} /> */}
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
