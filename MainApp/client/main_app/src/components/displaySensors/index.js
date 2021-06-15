import React from 'react';
import {SensorsList} from './SensorsList';


export class DisplaySensors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("JWT"),
            username: localStorage.getItem("username"),
            sensors : []
        }
    }
    componentDidMount(){
        //console.log('I was triggered during componentDidMount');
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("JWT") }
        };
        var urlReq = "http://127.0.0.1:4000/api/getData/sensors/" + localStorage.getItem("username");
        //console.log(urlReq);

        fetch(urlReq, requestOptions)
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
                    <h4>Loading display sensors</h4>
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