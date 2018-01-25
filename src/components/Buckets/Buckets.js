import React, { Component } from "react";
import axios from "axios";
// import App from "../App/App.js";
import "./Buckets.css";
import { Link } from "react-router-dom";
import BucketAdd from "../BucketAdd/BucketAdd.js";

class Buckets extends Component {
  constructor(props) {
    super(props);
    //initialize state
    this.state = {
      buckets: []
    };
  }

  componentDidMount() {
    axios
      .get("https://can-do-kanban-bend.herokuapp.com/bucket")
      .then(response => {
        this.setState({
          buckets: response.data
        });
      });
  }

  render() {
    let { history } = this.props;
    let buckets = this.state.buckets.map((bucket, index) => {
      return (
        <div id="buckets-body" key={index}>
          <p>
            <Link
              to={`${this.props.match.url}/${bucket.bTitle}`}
              onClick={this.props.setBucket}
            >
              <span id="bucket-name">{bucket.bTitle}</span>{" "}
            </Link>- <span id="bucket-desc">{bucket.bDesc}</span>
          </p>
        </div>
      );
    });
    return (
      <div>
        {buckets}
        <BucketAdd history={history} />
      </div>
    );
  }
}

export default Buckets;
