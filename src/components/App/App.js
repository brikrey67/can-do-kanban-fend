import React, { Component } from "react";
import "./App.css";

import About from "../About/About.js";
import Buckets from "../Buckets/Buckets.js";
// import BucketDetail from "../BucketDetail/BucketDetail.js";
import BucketEdit from "../BucketEdit/BucketEdit.js";

import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div>
        <Navbar className="bg-info" light>
          <NavbarBrand href="/buckets" className="mr-auto">
            buckets
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/about">About</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <main>
          <Switch>
            <Route path="/about" render={() => <About />} />
            <Route
              exact
              path="/buckets"
              render={props => <Buckets {...props} />}
            />
            <Route path="/buckets/:bTitle" component={BucketEdit} />
            <Route path="/*" render={() => <Redirect to="/buckets" />} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
