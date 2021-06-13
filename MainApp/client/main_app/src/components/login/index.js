import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


export class Login extends React.Component {
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
                        <Card.Title>Sign in</Card.Title>
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
                            <Form.Group onChange={e => this.setState({ password: e.target.value })}>
                                <Form.Label>Password</Form.Label>
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
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    onSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };

        fetch("http://localhost:4000/api/auth/login", requestOptions)
            .then(res => res.json())
            .then(res => {
                localStorage.setItem("JWT", res.data.accessToken);
                localStorage.setItem("username", res.data.username);
                //console.log(res.data);
                if (res.data.auth){
                    window.location.assign('/displaySensors');
                }
            })
            .catch();
    }
}