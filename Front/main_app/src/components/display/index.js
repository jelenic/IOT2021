import React from 'react';
import {MessageList} from './MessageList';
import Button from 'react-bootstrap/Button';
import {Link } from "react-router-dom";


export class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("JWT"),
            username: localStorage.getItem("username"),
            sensors : [],
            messages : []
        }

        //this.setValue = this.setValue.bind(this);
        this.onClick = this.onClick.bind(this);

    }

    componentDidMount(){
        //console.log('I was triggered during componentDidMount');
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("JWT") }
        };
        var urlReq = "http://127.0.0.1:4000/api/getData/EUI/" + localStorage.getItem("EUI");
        //console.log(urlReq);

        fetch(urlReq, requestOptions)
            .then(res =>
                res.json())
                //console.log(res.json().data))
            .then(data => this.setState({ messages: data.data }))
            .catch();
    }

    /*setValue = e => {
        this.setState({ EUI: e.target.getAttribute('value') });
      };*/
      onClick = () =>{
        console.log("test");
    }

    render(){

        console.log("in render");
        console.log(this.state.messages);

        if (this.state.messages.length === 0){
            console.log('empty');
            return(
                <div>
                    <h4>displayUplinkMessages</h4>
                </div>
                )
        }
        else{
            const {messages} = this.state;
            console.log(messages)
            return (
                <div className="smarthome">
                    <Link to="/downlink" onClick = {this.onClick}><button>
                        Downlink
                    </button>
                    </Link>
                    <MessageList messages={messages} />
                </div>
                )
        }
    }
}