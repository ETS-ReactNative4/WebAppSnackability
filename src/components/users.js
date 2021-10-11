import React, { Component } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

class Users extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.match.user;
    this.state = {
      user: "",
      searchField: "",
    };
  }

  componentDidMount() {
    // this.searchForUser("");
  }

  //   searchForUser(keyword) {
  //     debounce(() => {
  //       this.setState({ isLoading: true });
  //       fetchSnacksByNameUSDA(keyword)
  //         .then((response) => response.data)
  //         .then((snacks) => {
  //           this.setState({ snacks: snacks, isLoading: false });
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //           this.setState({ isLoading: false });
  //         });
  //     }, 1000);
  //   }

  render() {
    return (
      <div>
        <Container fluid className="mt-3">
          <Row>
            <Col sm={10}>
              <Form.Group>
                <Form.Control
                  type="search"
                  placeholder="🔎 Search for user..."
                  //   onKeyUp={(event) => this.searchUser(event.target.value)}
                />
              </Form.Group>
            </Col>
            <Form.Group className="SearchUser">
              <Col xs={{ span: 0.5 }}>
                <Button
                  type="submit"
                  variant="primary"
                  //   onClick={this.event}
                >
                  Search Users
                </Button>
              </Col>
            </Form.Group>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Users;
