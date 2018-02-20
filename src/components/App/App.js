import React, { Component } from "react";
import "./App.css";

import Signup from "../About/About.js";
import Buckets from "../Buckets/Buckets.js";
import BucketDetail from "../BucketDetail/BucketDetail.js";

import { Route, Link, Switch, Redirect } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <h1>Kanban</h1>
          <Link to="/buckets">Buckets</Link>
          <Link to="/about">About</Link>
        </nav>
        <main>
          <Switch>
            <Route path="/about" render={() => <About />} />
            <Route
              exact
              path="/buckets"
              render={props => <Buckets {...props} />}
            />
            <Route path="/buckets/:bTitle" component={BucketDetail} />
            <Route path="/*" render={() => <Redirect to="/buckets" />} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
