import React, { Component } from "react";
import "./BucketAdd.css";
import axios from "axios";
import BENDURL from "../../constants.js";
// import { withRouter } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Container,
  Collapse,
  Row,
  Col,
  Label,
  Input
} from "reactstrap";

class BucketAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bOrder: 0,
      bTitle: "",
      bDesc: "",
      intCrit: "",
      exCrit: "",
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
      bOrder: this.state.bOrder,
      bTitle: this.state.bTitle,
      bDesc: this.state.bDesc,
      intCrit: this.state.intCrit,
      exCrit: this.state.exCrit
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
              <Row>
                <Col xs="3">
                  <FormGroup>
                    <Label for="orderInput">order:</Label>
                    <Input
                      type="number"
                      name="bOrder"
                      id="orderInput"
                      required="true"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs="9">
                  <FormGroup>
                    <Label for="titleInput">title:</Label>
                    <Input
                      type="text"
                      name="bTitle"
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
                    <Label for="enterCritInput">entrance criteria:</Label>
                    <Input
                      type="textarea"
                      name="intCrit"
                      id="enterCritInput"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs="6">
                  <FormGroup>
                    <Label for="exitCritInput">exit criteria:</Label>
                    <Input
                      type="textarea"
                      name="exCrit"
                      id="exitCritInput"
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button className="btn btn-secondary" type="submit">
                add bucket
              </Button>
            </Form>
          </Collapse>
        </Container>
      </div>
    );
  }
}

export default BucketAdd;
