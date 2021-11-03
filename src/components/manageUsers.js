import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Table,
  Alert,
  Dropdown, 
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
      isSuccess: false,
      isError: false,
      success: "",
      error: "",
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


  sendPasswordReset() {
    axios({
      method: "POST",
      url: process.env.REACT_APP_API_ENDPOINT + "/resetpassword/send",
      data: this.state,
    }).then((response) => {
        this.setState({isSuccess:true, isError: false, success:"Password reset email sent!"});
        this.resetForm();
    }).catch(error => {
      console.log(error);
      this.setState({isError:true, isSuccess: false, error: error.response.data.error});
    })
  }

  //method incomplete!!
 getAllUsers(e) {
    e.preventDefault();
    axios({
      method: "GET",
      url: process.env.REACT_APP_API_ENDPOINT + "/users",
      data: this.state,
    })
    .then(response => {
      const allUsers = response.data.users.allUsers;
      this.getAllUsers(allUsers);
    })
    .catch(error => {
       //error
    });
  }

  

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

            <Row>
              <Col sm> 
                <Alert variant="success" show={this.state.isSuccess}> {this.state.success} </Alert>
                <Alert variant="danger" show={this.state.isError}> {this.state.error} </Alert>
              </Col>
              
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
                  <Button
                      variant="primary"
                      size="sm"
                      //type="submit"
                      //onClick={() => this.method()}
                    >
                      Forgot Password
                    </Button>
                  </td>
                  <td>
                  <Dropdown >
                    <Dropdown.Toggle>
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Disable</Dropdown.Item>
                      <Dropdown.Item>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
