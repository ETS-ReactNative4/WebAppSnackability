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
      // user: "",
      // searchField: "",
      // name: "",
      // email: "",
      // role: "",
      users: [],
      email: "",
      isSuccess: false,
      isError: false,
      success: "",
      error: "",
    };
  }

  componentDidMount() {
    this.getAllUsers();
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


  sendPasswordReset(email) {
    console.log(email);
    this.setState({email: email});
    axios({
      method: "POST",
      url: process.env.REACT_APP_API_ENDPOINT + "/resetpassword/send",
      data: this.state,
    }).then((response) => {
        this.setState({isSuccess:true, isError: false, success:"Password reset email sent!"});
    }).catch(error => {
      console.log(error);
      this.setState({isError:true, isSuccess: false, error: error.response.data.error});
    })
  }

  //method incomplete!!
  getAllUsers() {
    console.log("Test");
   axios.get(process.env.REACT_APP_API_ENDPOINT + "/users")
    .then((response) => {
      console.log(response);
      const allUsers = response.data;
      this.setState({users: allUsers});
      //this.renderTableData();
    })
    .catch((error) => {
      console.log(error);
    });
      
      // axios({
      //   method: "GET",
      //   url: process.env.REACT_APP_API_ENDPOINT + "/users",
      //   data: this.state,
      // })
      // .then(response => {
      //   const allUsers = response.data.users;
      //   console.log(allUsers);
      //   this.setState.users({allUsers});
      //   this.renderTableData();
      // })
      // .catch(error => {
      //   console.log("Error");
      // });
  }

  renderTableData() {
    console.log("HI!");
    return this.state.users.map((user, index) => {
       const { name, email, disabled, role, created_at, last_signed_in } = user;
       
       const rowNum = index + 1;
       console.log(rowNum);
       return (
        <tr key={index}>
          <td>{rowNum}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{role}</td>
          <td>
          <Button
              variant="primary"
              size="sm"
              //type="submit"
              onClick={() => this.sendPasswordReset(email)}
            >
              Reset Password
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
       )
    })
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
                {this.renderTableData()}
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
    );
  }
}

export default manageUsers;
