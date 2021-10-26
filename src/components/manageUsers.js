import React, { Component } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Table,
  Alert,
  
  
} from "react-bootstrap";

class manageUsers extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.match.user;
    this.state = {
      user: "",
      searchField: "",
      name: "",
      email: "",
      role: "",
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
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Password Reset</th>
                  <th>Disable or Delete Account</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Firstname Lastname</td>
                  <td>example@domain.com</td>
                  <td>User/Admin</td>
                  <td>
                    <Alert.Link href="/forgotpassword">
                      Forgot password
                    </Alert.Link>
                  </td>
                  <td>
                  <Form.Control as="select" size="sm">
                      <option>Select Option</option>
                      <option value="Disable">Disable</option>
                      <option value="Delete">Delete</option>
                     </Form.Control>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
    );
  }
}

export default manageUsers;
