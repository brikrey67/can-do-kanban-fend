import React, { Component } from "react";
import "./TaskAdd.css";
import axios from "axios";
import BENDURL from "../../constants.js";
// import { withRouter } from "react-router-dom";
import {
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  Container,
  Collapse,
  Label,
  Input
} from "reactstrap";

class TaskAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tTitle: "",
      tDesc: "",
      importance: "",
      points: 0,
      status: "",
      dueDate: "",
      targetBucket: this.props.targetBucket,
      collapse: false
    };

    this.onAddTaskSubmit = this.onAddTaskSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggle = this.toggle.bind(this);
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
    this.newTask = {
      tTitle: this.state.tTitle,
      tDesc: this.state.tDesc,
      importance: this.state.importance,
      points: this.state.points,
      status: this.state.status,
      dueDate: this.state.dueDate
    };
    // console.log(this.newTask);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  onAddTaskSubmit(e) {
    // e.preventDefault();
    axios
      .patch(BENDURL + "/bucket/" + this.state.targetBucket, this.newTask)
      .then(patchData => {
        this.props.handleTaskAdd();
      });
  }

  render() {
    return (
      <div>
        <Container>
          <hr />
          <button className="btn btn-secondary" onClick={this.toggle}>
            <span>
              <i className="material-icons">add_box</i>
            </span>
          </button>
          <hr />
          <Collapse isOpen={this.state.collapse}>
            <Form onSubmit={this.onAddTaskSubmit}>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label for="titleInput">title:</Label>
                    <Input
                      type="text"
                      name="tTitle"
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
                      id="descInput"
                      required="true"
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
                      required="true"
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
                      required="true"
                      id="pointsInput"
                      onChange={this.handleInputChange}
                    >
                      <option>Select points... </option>
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
                    <Label for="statusInput">% Complete:</Label>
                    <Input
                      type="number"
                      name="status"
                      required="true"
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
                      id="dueDateInput"
                      required="true"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button className="btn btn-secondary" type="submit">
                add task
              </Button>
            </Form>
          </Collapse>
        </Container>
      </div>
    );
  }
}

export default TaskAdd;
