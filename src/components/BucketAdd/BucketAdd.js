import React, { Component } from "react";
import "./BucketAdd.css";
import axios from "axios";
import BENDURL from "../../constants.js";
import { withRouter } from "react-router-dom";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Container,
  Collapse,
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
      collapse: false
    };

    this.onAddBucketSubmit = this.onAddBucketSubmit.bind(this);
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
    this.newBucket = {
      bOrder: this.state.order,
      bTitle: this.state.title,
      bDesc: this.state.desc,
      intCrit: this.state.enterCrit,
      exCrit: this.state.exitCrit
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  onAddBucketSubmit(e) {
    // e.preventDefault();
    axios.post(BENDURL + "/bucket", this.newBucket).then(data => {
      console.log(data);
      this.props.history.push("/buckets");
    });
  }

  render() {
    return (
      <div>
        <Container>
          <hr />
          <button className="btn btn-secondary" onClick={this.toggle}>
            ...
          </button>
          <hr />
          <Collapse isOpen={this.state.collapse}>
            <Form onSubmit={this.onAddBucketSubmit}>
              <FormGroup>
                <Label for="orderInput">order:</Label>
                <Input
                  type="number"
                  name="order"
                  id="orderInput"
                  onChange={this.handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="titleInput">title:</Label>
                <Input
                  type="text"
                  name="title"
                  id="titleInput"
                  onChange={this.handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="descInput">description:</Label>
                <Input
                  type="textarea"
                  name="desc"
                  id="descInput"
                  onChange={this.handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="enterCritInput">entrance criteria:</Label>
                <Input
                  type="textarea"
                  name="enterCrit"
                  id="enterCritInput"
                  onChange={this.handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="exitCritInput">exit criteria:</Label>
                <Input
                  type="textarea"
                  name="exitCrit"
                  id="exitCritInput"
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <button className="btn btn-secondary" type="submit">
                add bucket
              </button>
            </Form>
          </Collapse>
        </Container>
      </div>
    );
  }
}

export default BucketAdd;
