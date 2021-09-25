import React, { useCallback, useState } from 'react';
import { withRouter } from 'react-router';
import { app } from '../utils/auth';

import {
    Alert,
    Button,
    Card, Col, Container, Form,
    FormControl,
    InputGroup,
    Row,
} from 'react-bootstrap';

const SigninComponent = ({history}) => {

    const [error, setError] = useState('');

    const handleSignIn = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await app.auth().signInWithEmailAndPassword(email.value, password.value);
            history.push('/');
        } catch (e) {
            setError(e.message);
        }
    }, [history]);

    return (
        <Container className="mt-3">
            <Row className="justify-content-md-center">
                <Col xs={12} sm={8}>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSignIn}>
                                <Form.Label>Email</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl name="email" type="email" placeholder="email@domain.com" />
                                </InputGroup>
                                <Form.Label>Password</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl name="password" type="password" placeholder="Enter password" />
                                </InputGroup>

                                <Alert variant="danger" show={error}> {error} </Alert>

                                <Button type="submit" variant="primary"> Sign In </Button>
                                <br></br>
                                <br></br>
                                <p>
                                    Don't have an Account?{" "}
                                    <Alert.Link href="/contactus">Request Access</Alert.Link>.
                                </p> 
                                <p>
                                    Forgot password?{" "}
                                    <Alert.Link href="/forgotpassword">Reset Password</Alert.Link>.
                                </p> 
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

}

export default withRouter(SigninComponent);
