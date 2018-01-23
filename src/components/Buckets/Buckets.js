import React, { Component } from "react";
import App from "../App/App.js";
import "./Buckets.css";
import { Link } from "react-router-dom";

class Buckets extends Component {
  constructor(props) {
    super(props);
    // initialize state
    // this.state = {
    //   xxx: null
    // };
  }

  render() {
    let results = this.props.buckets.map((bucket, index) => {
      return (
        <div id="buckets-body" key={index}>
          <p>
            <Link
              to={`${this.props.match.url}/:${bucket.bTitle}`}
              onClick={this.props.setBucket}
            >
              <span id="bucket-name">{bucket.bTitle}</span>{" "}
            </Link>- <span id="bucket-desc">{bucket.bDesc}</span>
          </p>
        </div>
      );
    });
    return <div>{results}</div>;
  }
}

export default Buckets;
