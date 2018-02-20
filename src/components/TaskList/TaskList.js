import React, { Component } from "react";
import axios from "axios";
import "./TaskList.css";
import BENDURL from "../../constants.js";
import { Link } from "react-router-dom";
import TaskAdd from "../TaskAdd/TaskAdd.js";
import { Container, Row, Col } from "reactstrap";

class TaskList extends Component {
  constructor(props) {
    super(props);
    //initialize state
    this.state = {
      tasks: [],
      targetBucket: this.props.targetBucket
    };
  }

  componentDidMount() {
    axios.get(BENDURL + "/bucket/" + this.props.targetBucket).then(response => {
      this.setState({
        tasks: response.data.addedTask
      });
    });
  }

  render() {
    console.log("XXX " + this.state.addedTask);
    let { history } = this.props;
    let tasks = this.state.tasks.map((task, index) => {
      return (
        <div key={index}>
          <Row>
            <Col xs="4">
              <Link
                to={`${BENDURL}/bucket/${this.props.targetBucket}/${task._id}`}
                onClick={this.props.setBucket}
                className="text-info"
              >
                {task.tTitle}
              </Link>
            </Col>
            <Col xs="2">{task.importance}</Col>
            <Col xs="2">{task.points}</Col>
            <Col xs="2">{task.status}</Col>
            <Col xs="2">{task.dueDate}</Col>
          </Row>
        </div>
      );
    });
    return (
      <div>
        <Container>
          <Row>
            <Col xs="4">Task</Col>
            <Col xs="2">Importance</Col>
            <Col xs="2">Points</Col>
            <Col xs="2">Status</Col>
            <Col xs="2">Due Date</Col>
          </Row>
          {tasks}
          {/* <TaskAdd history={history} /> */}
        </Container>
      </div>
    );
  }
}

export default TaskList;
