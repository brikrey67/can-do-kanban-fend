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
      exitCrit: "",
      newBucket: {}
    };

    this.onAddBucketSubmit = this.onAddBucketSubmit.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDesc = this.handleDesc.bind(this);
    this.handleExitCrit = this.handleExitCrit.bind(this);
    this.handleEnterCrit = this.handleEnterCrit.bind(this);
  }

  handleOrder(e) {
    this.setState({
      order: e.target.value
    });
  }

  handleTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleDesc(e) {
    this.setState({
      desc: e.target.value
    });
  }

  handleEnterCrit(e) {
    this.setState({ enterCrit: e.target.value });
  }

  handleExitCrit(e) {
    this.setState({ exitCrit: e.target.value });
    // this.setState({
    //   newBucket: {
    //     bOrder: this.state.order,
    //     bTitle: this.state.title,
    //     bDesc: this.state.desc,
    //     entCrit: this.state.enterCrit,
    //     exCrit: this.state.exitCrit
    //   }
    // });
  }

  onAddBucketSubmit() {
    // e.preventDefault();
    this.setState({
      newBucket: {
        bOrder: this.state.order,
        bTitle: this.state.title,
        bDesc: this.state.desc,
        entCrit: this.state.enterCrit,
        exCrit: this.state.exitCrit
      }
    });

    axios
      .post(
        "https://can-do-kanban-bend.herokuapp.com/bucket",
        this.state.newBucket
      )
      .then(() => {
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
              onChange={this.handleOrder}
            />
          </FormGroup>

          <FormGroup>
            <Label for="titleInput">Title:</Label>
            <Input
              type="text"
              name="title"
              id="titleInput"
              onChange={this.handleTitle}
            />
          </FormGroup>

          <FormGroup>
            <Label for="descInput">Description:</Label>
            <Input
              type="textarea"
              name="desc"
              id="descInput"
              onChange={this.handleDesc}
            />
          </FormGroup>

          <FormGroup>
            <Label for="enterCritInput">Entrance Criteria:</Label>
            <Input
              type="textarea"
              name="enterCrit"
              id="enterCritInput"
              onChange={this.handleEnterCrit}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exitCritInput">Exit Criteria:</Label>
            <Input
              type="textarea"
              name="exitCrit"
              id="exitCritInput"
              onChange={this.handleExitCrit}
            />
          </FormGroup>

          <input type="submit" value="Add Bucket" />
        </Form>
      </div>
    );
  }
}

export default BucketAdd;
