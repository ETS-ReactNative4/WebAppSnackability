import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEllipsisV, } from '@fortawesome/free-solid-svg-icons';
import { Alert, Button, Card, Col, Container, Dropdown, Form, Row, Table, } from 'react-bootstrap';

function ManageUsers(props) {

    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        setUser(props.match.user);
        getAllUsers();
    }, []);

    function getAllUsers() {
        axios.get(process.env.REACT_APP_API_ENDPOINT + '/users')
             .then(response => response.data)
             .then((users: any[]) => {
                 setUsers(users);
                 // renderTableData();
             })
             .catch((error) => {
                 console.log(error);
             });
    }

    function sendPasswordReset(email) {
        axios({
            method: 'POST',
            url: process.env.REACT_APP_API_ENDPOINT + '/resetpassword/send',
            data: {
                email: email
            },
        }).then((response) => {
            setIsSuccess(true);
            setHasError(false);
            setSuccess('Password reset email sent!');
        }).catch(error => {
            setIsSuccess(false);
            setHasError(true);
            setError(error.response.data.errors[0].msg);
        });
    }

    function searchUser(event) {
        var filter = event.target.value.toUpperCase();
        var table = document.getElementById("table");
        var tr = table.getElementsByTagName("tr");
        var td, td1, td2, td3, i;

        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
          td1 = tr[i].getElementsByTagName("td")[1];
          td2 = tr[i].getElementsByTagName("td")[2];
          td3 = tr[i].getElementsByTagName("td")[3];
          if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1
                || td1.innerHTML.toUpperCase().indexOf(filter) > -1
                || td2.innerHTML.toUpperCase().indexOf(filter) > -1
                || td3.innerHTML.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }
        }
    }

    function renderTableData() {
        return users.map((user, index) => {

            const {name, email, disabled, role, created_at, last_signed_in} = user;
            const rowNum = index + 1;

            //Checks whether user is disabled and loads the appropriate enable/disable button
            if(disabled == true){
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
                                onClick={() => sendPasswordReset(email)}>
                                Reset Password
                            </Button>
                        </td>
                        <td>
                            <Button
                                variant="secondary"
                                size="sm"
                                //type="submit"
                                //onClick={() => sendPasswordReset(email)}
                            >
                                Enable Account
                            </Button>
                        </td>
                        <td>
                            <Button
                                variant="danger"
                                size="sm"
                                //type="submit"
                                //onClick={() => sendPasswordReset(email)}
                            >
                                Delete Account
                            </Button>
                        </td>
                    </tr>
                );
            }

            else{
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
                                onClick={() => sendPasswordReset(email)}>
                                Reset Password
                            </Button>
                        </td>
                        <td>
                            <Button
                                variant="primary"
                                size="sm"
                                //type="submit"
                                //onClick={() => sendPasswordReset(email)}
                            >
                                Disable Account
                            </Button>
                        </td>
                        <td>
                            <Button
                                variant="danger"
                                size="sm"
                                //type="submit"
                                //onClick={() => sendPasswordReset(email)}
                            >
                                Delete Account
                            </Button>
                        </td>
                    </tr>
                );
            } 
        });
    }

    return (
        
        <div>
            <Container fluid className="mt-3">

                <Row className="justify-content-md-center">
                    <Col sm={5}>
                        <Form.Group>
                            <Form.Control
                                type="search"
                                id="search"
                                placeholder="🔎 Search for user..."
                                onKeyUp={searchUser.bind(this)}
                            />
                        </Form.Group>
                    </Col>
                    <Form.Group className="SearchUser">
                        <Col xs={{span: 0.5}}>
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
                    <Card style={{ width: '90%', margin:'auto'}}> 
                        <Card.Body>
                            <Alert transition={false} variant="success" show={isSuccess}> {success} </Alert>
                            <Alert transition={false} variant="danger" show={hasError}> {error} </Alert>
                            <Table striped bordered hover id="table">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Password Reset</th>
                                    <th>Disable / Enable</th>
                                    <th>Delete Account</th>
                                </tr>
                                </thead>
                                <tbody>
                                {renderTableData()}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </div>
    );
}

export default ManageUsers;
