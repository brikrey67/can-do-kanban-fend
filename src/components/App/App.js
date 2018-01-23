import React, { Component } from "react";
import logo from "../../logo.svg";
import "./App.css";

import Signup from "../Signup/Signup.js";
import Login from "../Login/Login.js";
import Buckets from "../Buckets/Buckets.js";

import { Route, Link, Redirect, Switch } from "react-router-dom";
import "./App.css";

const buckets = [
  {
    bOrder: 1,
    bTitle: "backlog",
    bDesc: "bucket of tasks that might get executed",
    intCrit:
      "tasks or ideas seems to have business value, but hasn't been validated",
    exCrit: "tasks or ideas have been validated as valuable and affordable"
  },
  {
    bOrder: 2,
    bTitle: "to-do",
    bDesc: "bucket of tasks that are planned for execution",
    intCrit: "tasks or ideas have been validated as valuable and affordable",
    exCrit: "tasks or ideas that will be taken on next"
  },
  {
    bOrder: 3,
    bTitle: "in-progress",
    bDesc: "bucket of tasks that are being activily worked on",
    intCrit: "tasks or ideas that will be taken on next",
    exCrit: "tasks or ideas have been completed"
  },
  {
    bOrder: 4,
    bTitle: "completed",
    bDesc: "bucket of tasks that have been completed",
    intCrit: "tasks or ideas that have no remaining work",
    exCrit: "tasks or ideas can be archived"
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    // initialize state
    this.state = {
      buckets,
      targetBucket: null
    };
  }

  // function to pass to Bucket.js
  setBucket(data) {
    this.setState({
      targetStock: data
    });
  }

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
              path="/buckets"
              render={props => (
                <Buckets
                  {...props}
                  setBucket={data => this.setBucket(data)}
                  buckets={buckets}
                />
              )}
            />
            {/* <Route path="/*" render={() => <Redirect to="/buckets" />} /> */}
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
