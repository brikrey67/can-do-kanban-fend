import React, { Component } from "react";
import axios from "axios";
import "./BucketDetail.css";

class BucketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bucketDetail: {},
      targetBucket: this.props.match.params.bTitle
    };
  }

  componentDidMount() {
    console.log("PARAMS: " + this.state.targetBucket);
    axios
      .get(
        "https://can-do-kanban-bend.herokuapp.com/bucket/" +
          this.state.targetBucket
      )
      .then(response => {
        this.setState({
          bucketDetail: response.data
        });
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
        </div>
      </div>
    );
  }
}

export default BucketDetail;
