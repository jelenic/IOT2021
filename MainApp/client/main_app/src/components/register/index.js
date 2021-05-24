import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    render() {
        return (
            <div className="login center-screen">
                <Card>
                    <Card.Body>
                        <Card.Title>Refister</Card.Title>
                        <Form
                            className="login-form"
                            onSubmit={this.onSubmit}
                        >
                            <Form.Group onChange={e => this.setState({ email: e.target.value })}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    placeholder="Enter email"
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group onChange={e => this.setState({ username: e.target.value })}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    placeholder="Enter username"
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group onChange={e => this.setState({ password: e.target.value })}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    placeholder="Password"
                                    type="password"
                                />
                            </Form.Group>
                            <Form.Group onChange={e => this.setState({ cpassword: e.target.value })}>
                                <Form.Label>CPassword</Form.Label>
                                <Form.Control
                                    placeholder="Password"
                                    type="password"
                                />
                            </Form.Group>
                            <Button
                                className="submit-button"
                                disabled={this.state.email.length === 0 || this.state.password.length === 0}
                                type="submit"
                                variant="primary"
                            >
                                Register
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    onSubmit = event => {
        event.preventDefault();
        const { email, password, cpassword, username } = this.state;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, cpassword, username })
        };

        fetch("http://localhost:4000/api/auth/register", requestOptions)
            .then(res => res.json())
            .then(res => {
                localStorage.setItem("currentUser", res.token);
                window.location.assign("/test");
            })
            .catch();
    }
}