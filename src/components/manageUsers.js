import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEllipsisV, } from '@fortawesome/free-solid-svg-icons';
import { Alert, Button, Col, Container, Dropdown, Form, Row, Table, } from 'react-bootstrap';

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

    function renderTableData() {
        return users.map((user, index) => {

            const {name, email, disabled, role, created_at, last_signed_in} = user;
            const rowNum = index + 1;

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
                        <Dropdown>
                            <Dropdown.Toggle>
                                <FontAwesomeIcon icon={faEllipsisV}/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Disable</Dropdown.Item>
                                <Dropdown.Item>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
            );
        });
    }

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
                    <Col sm>
                        <Alert transition={false} variant="success" show={isSuccess}> {success} </Alert>
                        <Alert transition={false} variant="danger" show={hasError}> {error} </Alert>
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
                        {renderTableData()}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </div>
    );
}

export default ManageUsers;
