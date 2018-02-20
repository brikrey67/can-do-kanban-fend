import React, { Component } from "react";
import "./BucketEdit.css";
import axios from "axios";
import TaskList from "../TaskList/TaskList.js";
// import { withRouter } from 'react-router-dom'
import {
  Form,
  FormGroup,
  Row,
  Col,
  Container,
  Button,
  Label,
  Input
} from "reactstrap";
import BENDURL from "../../constants.js";

class BucketEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bOrder: 0,
      bTitle: "",
      bDesc: "",
      intCrit: "",
      exCrit: "",
      targetBucket: this.props.match.params.bTitle
    };

    this.onEditBucketSubmit = this.onEditBucketSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.bucketDelete = this.bucketDelete.bind(this);
  }

  componentDidMount() {
    axios.get(BENDURL + "/bucket/" + this.state.targetBucket).then(response => {
      this.setState({
        bOrder: response.data.bOrder,
        bTitle: response.data.bTitle,
        bDesc: response.data.bDesc,
        intCrit: response.data.intCrit,
        exCrit: response.data.exCrit
      });
    });
  }

  // sourced from https://reactjs.org/docs/forms.html#handling-multiple-inputs
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidUpdate() {
    this.editBucket = {
      bOrder: this.state.bOrder,
      bTitle: this.state.bTitle,
      bDesc: this.state.bDesc,
      intCrit: this.state.intCrit,
      exCrit: this.state.exCrit
    };
  }

  onEditBucketSubmit(e) {
    e.preventDefault();
    console.log("editBucket: " + this.editBucket);
    axios
      .put(BENDURL + "/bucket/" + this.state.targetBucket, this.editBucket)
      .then(data => {
        console.log(data);
        this.props.history.push("/buckets");
      });
  }

  bucketDelete(e) {
    e.preventDefault();
    axios.delete(BENDURL + "/bucket/" + this.state.targetBucket).then(() => {
      this.props.history.push("/buckets");
    });
  }

  render() {
    return (
      <div className="form">
        <Container>
          <Form onSubmit={this.onEditBucketSubmit}>
            <Row>
              <Col xs="3">
                <FormGroup>
                  <Label for="orderInput">order:</Label>
                  <Input
                    type="number"
                    value={this.state.bOrder}
                    name="bOrder"
                    id="orderInput"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col xs="9">
                <FormGroup>
                  <Label for="titleInput">title:</Label>
                  <Input
                    type="text"
                    value={this.state.bTitle}
                    name="bTitle"
                    id="titleInput"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label for="descInput">description:</Label>
                  <Input
                    type="textarea"
                    value={this.state.bDesc}
                    name="bDesc"
                    id="descInput"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label for="intCritInput">enterance criteria:</Label>
                  <Input
                    type="textarea"
                    value={this.state.intCrit}
                    name="intCrit"
                    id="intCritInput"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label for="exCritInput">exit criteria:</Label>
                  <Input
                    type="textarea"
                    value={this.state.exCrit}
                    name="exCrit"
                    id="exCritInput"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button className="btn btn-secondary" type="submit">
              update
            </Button>
            {"  "}
            <Button className="btn btn-secondary" onClick={this.bucketDelete}>
              delete
            </Button>
          </Form>
          <hr />
        </Container>
        <TaskList targetBucket={this.state.targetBucket} {...this.props} />
      </div>
    );
  }
}

export default BucketEdit;
