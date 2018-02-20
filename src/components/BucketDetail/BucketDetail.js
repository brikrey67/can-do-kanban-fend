import React, { Component } from "react";
import axios from "axios";
// import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./BucketDetail.css";
import BENDURL from "../../constants.js";

class BucketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bucketDetail: {},
      targetBucket: this.props.match.params.bTitle
    };
    this.bucketDelete = this.bucketDelete.bind(this);
  }

  componentDidMount() {
    axios.get(BENDURL + "/bucket/" + this.state.targetBucket).then(response => {
      this.setState({
        bucketDetail: response.data
      });
    });
  }

  // redirect based on: https://stackoverflow.com/questions/34735580/how-to-do-a-redirect-to-another-route-with-react-router
  bucketDelete(e) {
    e.preventDefault();
    axios.delete(BENDURL + "/bucket/" + this.state.targetBucket).then(() => {
      this.props.history.push("/buckets");
    });
  }

  render() {
    return (
      <div id="bucket-detail-body">
        <h3>
          <span id="bucket-title">Bucket Details</span>
        </h3>
        <div id="bucket-detail">
          <p>
            <span id="label">Bucket Order:</span>{" "}
            {this.state.bucketDetail.bOrder}
          </p>
          <p>
            <span id="label">Bucket Title:</span>{" "}
            {this.state.bucketDetail.bTitle}
          </p>
          <p>
            <span id="label">Bucket Desc:</span> {this.state.bucketDetail.bDesc}
          </p>
          <p>
            <span id="label">Entrance Criteria:</span>{" "}
            {this.state.bucketDetail.intCrit}
          </p>
          <p>
            <span id="label">Exit Criteria:</span>{" "}
            {this.state.bucketDetail.exCrit}
          </p>

          <form onSubmit={this.bucketDelete}>
            <input id="bucket-form" type="submit" value="Delete Bucket" />
          </form>
        </div>
      </div>
    );
  }
}

export default BucketDetail;
