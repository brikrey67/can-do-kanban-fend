import React, { Component } from "react";
import axios from "axios";
import "./TaskList.css";
import BENDURL from "../../constants.js";
import { Link } from "react-router-dom";
import { Container, Row, Col, Progress } from "reactstrap";
import TaskAdd from "../TaskAdd/TaskAdd.js";

class TaskList extends Component {
  constructor(props) {
    super(props);
    //initialize state
    this.state = {
      tasks: [],
      targetBucket: this.props.targetBucket
    };
    this.handleTaskAdd = this.handleTaskAdd.bind(this);
  }

  componentDidMount() {
    axios.get(BENDURL + "/bucket/" + this.props.targetBucket).then(response => {
      this.setState({
        tasks: response.data.addedTask
      });
    });
  }

  handleTaskAdd() {
    axios.get(BENDURL + "/bucket/" + this.props.targetBucket).then(response => {
      this.setState({
        tasks: response.data.addedTask
      });
    });
  }

  // sourced from: https://codepen.io/austinlyons/pen/YpmyJB
  compareBy(key) {
    return function(a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }

  sortBy(key) {
    let tasksCopy = [...this.state.tasks];
    tasksCopy.sort(this.compareBy(key));
    this.setState({ tasks: tasksCopy });
  }

  render() {
    let tasks = this.state.tasks.map((task, index) => {
      return (
        <div key={index}>
          <Row>
            <Col xs="4">
              <Link
                to={`${this.props.match.url}/${task._id}`}
                className="text-info"
              >
                {" "}
                <span>
                  <i className="material-icons">input</i>
                </span>{" "}
                {"  "}
                {task.tTitle}
              </Link>
            </Col>
            <Col xs="2">{task.importance}</Col>
            <Col xs="2">{task.points}</Col>
            <Col xs="2">
              <div>
                <Progress color="info" value={task.status}>
                  {task.status}
                </Progress>
              </div>
            </Col>
            <Col xs="2">{task.dueDate}</Col>
          </Row>
        </div>
      );
    });
    return (
      <div>
        <Container>
          <Row className="bg-info task-header">
            <Col xs="4" onClick={() => this.sortBy("tTitle")}>
              Task
            </Col>
            <Col xs="2" onClick={() => this.sortBy("importance")}>
              Importance
            </Col>
            <Col xs="2" onClick={() => this.sortBy("points")}>
              Points
            </Col>
            <Col xs="2" onClick={() => this.sortBy("status")}>
              % Complete
            </Col>
            <Col xs="2" onClick={() => this.sortBy("dueDate")}>
              Due Date
            </Col>
          </Row>
          {tasks}
        </Container>
        <TaskAdd
          targetBucket={this.state.targetBucket}
          handleTaskAdd={this.handleTaskAdd}
        />
      </div>
    );
  }
}

export default TaskList;
