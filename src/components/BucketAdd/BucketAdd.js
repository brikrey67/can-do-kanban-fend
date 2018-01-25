import React, { Component } from "react";
import "./BucketAdd.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

class BucketAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 0,
      title: "",
      desc: "",
      enterCrit: "",
      exitCrit: ""
      // newBucket: {}
    };

    this.onAddBucketSubmit = this.onAddBucketSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
    let newBucket = {
      bOrder: this.state.order,
      bTitle: this.state.title,
      bDesc: this.state.desc,
      intCrit: this.state.enterCrit,
      exCrit: this.state.exitCrit
    };
  }

  onAddBucketSubmit(e) {
    // e.preventDefault();
    axios
      .post("https://can-do-kanban-bend.herokuapp.com/bucket", this.newBucket)
      .then(data => {
        console.log(data);
        this.props.history.push("/buckets");
      });
  }

  render() {
    return (
      <div className="form" id="bucket-add-body">
        <hr />
        <Form onSubmit={this.onAddBucketSubmit}>
          <FormGroup>
            <Label for="orderInput">Order:</Label>
            <Input
              type="number"
              name="order"
              id="orderInput"
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="titleInput">Title:</Label>
            <Input
              type="text"
              name="title"
              id="titleInput"
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="descInput">Description:</Label>
            <Input
              type="textarea"
              name="desc"
              id="descInput"
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="enterCritInput">Entrance Criteria:</Label>
            <Input
              type="textarea"
              name="enterCrit"
              id="enterCritInput"
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exitCritInput">Exit Criteria:</Label>
            <Input
              type="textarea"
              name="exitCrit"
              id="exitCritInput"
              onChange={this.handleInputChange}
            />
          </FormGroup>

          <input type="submit" value="Add Bucket" />
        </Form>
      </div>
    );
  }
}

export default BucketAdd;
