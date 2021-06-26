import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


export class AddSensor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("JWT"),
            EUI: "",
            email: "",
            type: "",
            desc:""
        }
    }

    render() {
        return (
            <div className="login center-screen">
                <Card>
                    <Card.Body>
                        <Card.Title>AddSensor</Card.Title>
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
                            <Form.Group onChange={e => this.setState({ EUI: e.target.value })}>
                                <Form.Label>EUI</Form.Label>
                                <Form.Control
                                    placeholder="EUI"
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group onChange={e => this.setState({ type: e.target.value })}>
                                <Form.Label>type</Form.Label>
                                <Form.Control
                                    placeholder="type"
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group onChange={e => this.setState({ desc: e.target.value })}>
                                <Form.Label>description</Form.Label>
                                <Form.Control
                                    placeholder="description"
                                    type="text"
                                />
                            </Form.Group>
                            <Button
                                className="submit-button"
                                disabled={this.state.email.length === 0 || this.state.EUI.length === 0 || this.state.type.length === 0}
                                type="submit"
                                variant="primary"
                            >
                                AddSensor
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    onSubmit = event => {
        event.preventDefault();
        const { token, EUI, email, type, desc } = this.state;
        console.log(email);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ EUI:EUI, user:email, type:type, desc:desc })
        };
        //console.log(requestOptions.body);

        fetch("http://127.0.0.1:4000/api/sensor/add-sensor", requestOptions)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                window.location.assign('/displaySensors');
            })
            .catch();
    }
}