import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


export class Downlink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            EUI: localStorage.getItem("EUI"),
            type: localStorage.getItem("type"),
            dataType: "",
            port: "",
            data: ""
        }
    }

    render() {
        console.log(this.state);
        console.log(localStorage.getItem("sensor"));
        return (
            <div className="login center-screen">
                <Card>
                    <Card.Body>
                        <Card.Title>Send Downlink Message</Card.Title>
                        <Form
                            className="login-form"
                            onSubmit={this.onSubmit}
                        >
                            <Form.Group onChange={e => this.setState({ dataType: e.target.value })}>
                                <Form.Label>DataType</Form.Label>
                                <Form.Control
                                    placeholder="Enter dataType (image or text)"
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group onChange={e => this.setState({ port: e.target.value })}>
                                <Form.Label>Port</Form.Label>
                                <Form.Control
                                    placeholder="Enter port (number)"
                                    type="integer"
                                />
                            </Form.Group>
                            <Form.Group onChange={e => this.setState({ data: e.target.value })}>
                                <Form.Label>Data</Form.Label>
                                <Form.Control
                                    placeholder="Enter data"
                                    type="text"
                                />
                            </Form.Group>
                            <Button
                                className="submit-button"
                                disabled={this.state.data.length === 0}
                                type="submit"
                                variant="primary"
                            >
                                SendDownlink
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    onSubmit = event => {
        event.preventDefault();
        const { EUI, type, dataType, port, data } = this.state;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("JWT") },
            body: JSON.stringify({ EUI, type, dataType, port, data })
        };

        fetch("http://localhost:4000/api/getData/downlink", requestOptions)
            .then(res => res.json())
            .then(res => {
                console.log(res.data);
                window.location.assign('/displaySensors');
            })
            .catch();
    }
}