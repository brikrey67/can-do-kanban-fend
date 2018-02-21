import React, { Component } from "react";
import "./TaskEdit.css";
import axios from "axios";
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

class TaskEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tTitle: "",
      tDesc: "",
      importance: "",
      points: 0,
      status: "",
      dueDate: "",
      targetBucket: this.props.match.params.bTitle,
      targetTask: this.props.match.params._id,
      listBuckets: [],
      moveToBucket: ""
    };

    this.onEditTaskSubmit = this.onEditTaskSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.taskDelete = this.taskDelete.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        BENDURL +
          "/bucket/" +
          this.state.targetBucket +
          "/" +
          this.state.targetTask
      )
      .then(response => {
        this.setState({
          tTitle: response.data.taskData.tTitle,
          tDesc: response.data.taskData.tDesc,
          importance: response.data.taskData.importance,
          points: response.data.taskData.points,
          status: response.data.taskData.status,
          dueDate: response.data.taskData.dueDate,
          listBuckets: response.data.bucketList
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
    this.editTask = {
      tTitle: this.state.tTitle,
      tDesc: this.state.tDesc,
      importance: this.state.importance,
      points: this.state.points,
      status: this.state.status,
      dueDate: this.state.dueDate
    };
  }

  onEditTaskSubmit(e) {
    e.preventDefault();
    let PATH =
      BENDURL +
      "/bucket/" +
      this.state.targetBucket +
      "/" +
      this.state.targetTask;
    // console.log("PATH: " + PATH);
    // console.log("EDITTASK: " + this.editTask);
    // console.log("HISTORY: " + this.props.history);
    axios.put(PATH, this.editTask).then(response => {
      this.props.history.push("/buckets/" + this.state.targetBucket);
    });
  }

  onMoveTaskSubmit(e) {}

  taskDelete(e) {
    e.preventDefault();
    let PATH =
      BENDURL +
      "/bucket/" +
      this.state.targetBucket +
      "/" +
      this.state.targetTask;
    // console.log("PATH: " + PATH);
    axios.delete(PATH).then(response => {
      this.props.history.push("/buckets/" + this.state.targetBucket);
    });
  }

  render() {
    let listBuckets = this.state.listBuckets.map((listBucket, index) => {
      return <option>{listBucket.bTitle}</option>;
    });
    return (
      <div className="form">
        <Container>
          <Form onSubmit={this.onEditTaskSubmit}>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label for="titleInput">title:</Label>
                  <Input
                    type="text"
                    name="tTitle"
                    value={this.state.tTitle}
                    id="titleInput"
                    required="true"
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
                    name="tDesc"
                    value={this.state.tDesc}
                    id="descInput"
                    color="info"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label for="impInput">importance:</Label>
                  <Input
                    type="select"
                    name="importance"
                    value={this.state.importance}
                    id="impInput"
                    onChange={this.handleInputChange}
                  >
                    <option>Select importance...</option>
                    <option>Very Low</option>
                    <option>Low </option>
                    <option>Moderate</option>
                    <option>High</option>
                    <option>Very High</option>
                    <option>Critical</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label for="pointsInput">points:</Label>
                  <Input
                    type="select"
                    name="points"
                    value={this.state.points}
                    id="pointsInput"
                    onChange={this.handleInputChange}
                  >
                    <option>Estimate points...</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>5</option>
                    <option>8</option>
                    <option>13</option>
                    <option>21</option>
                    <option>34</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label for="statusInput">status:</Label>
                  <Input
                    type="number"
                    name="status"
                    value={this.state.status}
                    id="statusInput"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label for="dueDateInput">due date:</Label>
                  <Input
                    type="date"
                    name="dueDate"
                    value={this.state.dueDate}
                    id="dueDateInput"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button className="btn btn-secondary" type="submit">
              update
            </Button>
            {"  "}
            <Button className="btn btn-secondary" onClick={this.taskDelete}>
              delete
            </Button>
          </Form>
          <hr />
        </Container>
        <Container>
          <Form onSubmit={this.onMoveTaskSubmit}>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label for="moveInput">move to bucket:</Label>
                  <Input
                    type="select"
                    name="moveToBucket"
                    id="moveInput"
                    onChange={this.handleInputChange}
                  >
                    {listBuckets}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Button className="btn btn-secondary" type="submit">
              move
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default TaskEdit;
