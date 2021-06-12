import React from 'react';
import {SensorsList} from './SensorsList';


export class DisplaySensors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("JWT"),
            sensors : []
            /*sensors: [
                {
                    EUI: "A81758FFFE04D146",
                    type: "elsys",
                    desc: "elsys desc"
                },
                {
                    EUI: "C81758FFFE04D146",
                    type: "elsys",
                    desc: "elsys desc"
                },
                {
                    EUI: "R81758FFFE04D146",
                    type: "elsys",
                    desc: "elsys desc"
                }
            ]*/
        }
    }
    componentDidMount(){
        //console.log('I was triggered during componentDidMount');
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("JWT") }
        };

        fetch("http://127.0.0.1:4000/api/getData/sensors/a", requestOptions)
            .then(res =>
                res.json())
                //console.log(res.json().data))
            .then(data => this.setState({ sensors: data.data }))
            .catch();
    }
    render(){
        console.log("in render");
        console.log(this.state.sensors);

        if (this.state.sensors.length === 0){
            console.log('empty');
            return (
                <div>
                    <h4>displaySensors</h4>
                </div>
                )
        }
        else{
            const {sensors} = this.state;
            console.log(sensors)
            return (
                <div className="smarthome">
                    <SensorsList sensors={sensors} />
                </div>
                )
        }

        /*return (
            <div className="smarthome">
                <SensorsList sensors={sensors} />
            </div>
        );}*/
    }
}