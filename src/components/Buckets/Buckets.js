import React, { Component } from "react";
import axios from "axios";
// import App from "../App/App.js";
import "./Buckets.css";
import BENDURL from "../../constants.js";
import { Link } from "react-router-dom";
import BucketAdd from "../BucketAdd/BucketAdd.js";
import { Container, Breadcrumb, BreadcrumbItem } from "reactstrap";

class Buckets extends Component {
  constructor(props) {
    super(props);
    //initialize state
    this.state = {
      buckets: []
    };
  }

  componentDidMount() {
    axios.get(BENDURL + "/bucket").then(response => {
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
              className="text-info"
            >
              <span>
                <i className="material-icons">list</i>
              </span>{" "}
              {"  "}
              {bucket.bTitle}
            </Link>- <span id="bucket-desc">{bucket.bDesc}</span>
          </p>
        </div>
      );
    });
    return (
      <div>
        <Container>
          <hr />
          <Breadcrumb>
            <BreadcrumbItem active>buckets</BreadcrumbItem>
          </Breadcrumb>
          <hr />
          {buckets}
          <BucketAdd history={history} />
        </Container>
      </div>
    );
  }
}

export default Buckets;
